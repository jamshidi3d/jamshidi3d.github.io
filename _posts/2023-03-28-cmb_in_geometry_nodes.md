---
title: How-to use Blender's geometry nodes for computation on CMB
date: 2023-03-28 10:30:00 +0200
categories: [Blender, How-to]
tags: [physics, cosmology, healpix, healpy, 3d, mesh, blender, geometry-nodes, cmb, how-to, tutorial]     # TAG names should always be lowercase
img_path: /assets/img/2023-03-28-cmb_in_geometry_nodes/
---

In this note I'm going to introduce Blender's power to scientists, mainly cosmologists. I will show you how to bring your data into Blender and how to work with it step by step. The methods explained here are for local computers but could also be applied elsewhere (e.g. google colab). Each step could be a separate post but the order could be problematic in case of separation.

## Creating HEALPix mesh

First, we need to create a 3d mesh out of healpix data. There are several ways to do it but the easiest way is to use [healpy](https://pypi.org/project/healpy/) package. To install healpy, you shoud have [astropy](https://pypi.org/project/astropy/) preinstalled since healpy requires this module(and so for numpy, matplotlib etc.) 

> Since at the moment, healpy is only available on linux, windows users can use [wsl](https://learn.microsoft.com/en-us/windows/wsl/install)(windows subsystem for linux) that allows them to run linux terminals in windows environment.
{: .prompt-info }

In the following, we will create a handmade *OBJ* file that can be imported to any 3d DCC.
Now in this section we will use **system's python** to create our mesh, not Blender's, since Blender uses its own *internal python* which is a totally separate one (*Insha'allah* I will write a post on how to install external modules in Blender's python; but even if we install healpy in Blender's python it is not still useable in Win/Mac).

First, we create a function to generate texts needed for making *OBJ* file.

```python
import numpy as np
import healpy as hp

def generate_obj_txt(element_arr, str_key):
    txt = ""
    space, next_line = " ", "\n"
    for elem in element_arr:
        txt += str_key + "".join(space + str(component) for component in elem) + next_line
    return txt
```
{: .nolineno }

The above function creates simple texts like this:

```
v 0.0 1.0 -0.0
v 0.0 1.0 1.0
f 1 2 3 4
f 5 6 7 8
. . . 
```
{: .nolineno }

That defines vertex coordinates and certain indices that make a face(forget about any additional data; edges, skinning data etc. since we don't need those in this tutorial).

Then we store pixels' corners(boundaries) in a well sorted way like bellow:

```python
nside = 64
npix = 12 * nside ** 2 
v_coords = np.zeros((npix * 4, 3)) # 4 corners for each pixel and 3 coords for each corner

for i in range(npix):
    pbounds = hp.boundaries(nside = nside, pix = i, step = 1, nest = False) # we use ring indexing
    v_coords[4 * i : 4 * (i + 1)] = np.transpose(pbounds)

v_indices = np.arange(len(v_coords)) + 1
faces = v_indices.reshape((npix, 4))
```
{: .nolineno }

One can optionally merge duplicate vertices here, by utilizing merging algorithms, but it is much easier and faster to do this process inside Blender.

Now its time to write the *OBJ* file using above arrays of vertices and faces. Note that we have to change coordinates from (right handed)xyz to (left handed)xzy (`y_lh = z` , `z_lh = -y`) since its the most usual used case for *OBJ* file importers:

```python
# mesh creation
f3dname = "healpix_sphere.obj"
with open(f3dname,'w') as f3d:
    # before saving, change coords
    v_coords[:, 1], v_coords[:, 2] = np.copy(v_coords[:, 2]), -np.copy(v_coords[:, 1])
    ftxt = generate_obj_txt(v_coords, "v")
    ftxt += generate_obj_txt(faces, "f")
    f3d.write(ftxt)
```
{: .nolineno }

For high resolution maps(`nside`>1024), mesh creation is not a good approach for processing, because only the mesh by itself, takes a huge amount of memmory and needs a high-end graphics card to manage. Although Blender can handle a 50M polygons mesh with a high-end graphics card, but it's not really an optimized way for data processing.

For high `nside` values (>256) it is recommended to create the mesh part-by-part; that means dividing `npix` array into several sections and making a mesh for each part (you can merge all these parts in Blender). It may take up to an hour for generating a `nside=2048` mesh but it can also become very heavy(about 12 GB while with vertices merged it would be ~2.5GB at most). So divide it and merge part-by-part. we can write a script to do all that.

> I have to say thanks to [Andrea Zonca](https://www.zonca.dev/) who helped me with finding boundaries of pixels.
{: .prompt-info }


## Importing the mesh into Blender (Intro to Geometry Nodes)

This section is for complete begginners in [Geometry Nodes](https://docs.blender.org/manual/en/latest/modeling/geometry_nodes/). If you already know about that, skip this part.

Open Blender, and now you see default objects. Click on the *3dView* and press <kbd>A</kbd> to select them all and press <kbd>X</kbd> and <kbd>Enter</kbd> to confirm deletion.

Now click on **File > import > Wavefront(.obj)** and head to the directory of your *OBJ* file you created and import it. The imege below shows a HEALPix mesh with `nside = 16`:

![healpix shpere](healpix_sphere.png)

As explained before the file contains lots of redundant vertices since neighboring pixels have duplicate vertices. To this end we could use several different tools but for getting familiar to Blender's **Geometry Nodes**(from now on geo-nodes), we use this tool to merge those redundant vertices.

At the top bar in the far right find *Geometry Nodes* tab and click it.

![top bar](top_bar.png)

> If you don't find *Geometry Nodes* tab, hover your cursor on the top bar and hold <kbd>MMB</kbd> to pan the bar to the left to find *Geometry Nodes*. It is worth noting that anywhere in Blender(in 3dView, panels etc.), <kbd>MMB</kbd> is used for panning, <kbd>Ctrl</kbd>+<kbd>MMB</kbd> for zooming and <kbd>Ctrl</kbd>+<kbd>Space</kbd> for maximizing view.
{: .prompt-tip}

Now select the HEALPix sphere you imported, and click on the <kbd>+  New</kbd> button on top of the geo-nodes panel. Now you will see an input mesh and an output that are the same at the moment:

![new geo nodes](new_geo_nodes.png)

Now we want to add a node to merge duplicate vertices. Press <kbd>Shift</kbd>+<kbd>A</kbd> to open add-pannel.

> <kbd>Shift</kbd>+<kbd>A</kbd> everywhere opens add menu.
{: .prompt-tip}

At the top click on search and search *merge* to find *Merge By Distance* and press <kbd>Enter</kbd>. Now move it to the middle of the process and click to place it like this:

![merge by distance](merge_by_distance.png)

On the far right you will find *Properties* panel. Click on the *modifier*'s dropdown button and select apply.

![apply modifier](apply_modifier.png)

Now you have merged all redundant vertices. Save the file somewhere for later use.


## Importing map data and setting mesh attributes

In this section we are going to extract data from *CMB* maps and import them as face data of the mesh.
First you have to extract data from e.g. Planck maps. To do this, first download one of the provided maps e.g. [Commander](https://irsa.ipac.caltech.edu/data/Planck/release_3/all-sky-maps/maps/component-maps/cmb/COM_CMB_IQU-commander_2048_R3.00_full.fits).

Now in system's python, read Plack map and extract its temperature, stokes_q and stokes_u data:
```python
# Extracting data from .fits files
import numpy as np
import healpy as hp

nside = 64
fpath = "E:/Your/Path/" # change it for your own case 
fpath += "COM_CMB_IQU-commander_2048_R3.00_full.fits"

_fields = (5, 6, 7) # inpainted fields
_names = ("temp", "stokes_q", "stokes_u")
for name, field in zip(_names, _fields):
    map = hp.read_map(fpath, field = field, nest=False)
    map = hp.ud_grade(map, nside_out=nside, order_in='RING')
    map *= 10**6
    np.savetxt("./" + name + ".txt", map) # format doesn't matter that much
```
{: .nolineno }

Having data extracted, open *Blender > stored mesh file*, pan the top bar and select *Scripting*. In the *Text Editor* create a new script and enter the bellow code into it:

```python
# Assigning attributes to mesh
import numpy as np
import bpy

path = "E:/Your/Path/To/" # change it for your own case

obj_attr = bpy.context.object.data.attributes # active object's attributes

_names = ("temp", "stokes_q", "stokes_u")
_attributes = [np.loadtxt(path + name +".txt") for name in _names]

for name, attr in zip(_names, _attributes):
    obj_attr.new(name=name, type='FLOAT', domain='FACE')
    obj_attr[name].data.foreach_set('value', attr)
```
{: .nolineno }

The above code assigns your each pixel's data into its analogous face in the created mesh. Assigning attributes to the mesh lets you use the power of geo-nodes in parallel computations and also visualization(in realtime!).

## Visualizing assigned attributes

In this section we want to achieve a visualization mechanism. The result is like the image bellow:

![temp sphere](temp_sphere.png)

### Visualization nodes

Get back to *Geometry Nodes* tab and create a new one. Create a geo-nodes graph like the one below(I will explain what all these do):

![visualization nodes](visualization_nodes.png)

We proceed from left to right. First, the *Named Attributes* nodes takes the data values we assigned to mesh(in previous section) and makes it visible for geo-nodes. The *Attributes Statistics* node reads these values and gives the useful outputs you see (Note that it needs the *Geometry* wire to know which mesh we are looking for). Then we map minimum & maximum values of the *temp* attribute into the range (0, 1) by *Map Range* node. The *ColorRamp* node maps these values to a set of color data(attributes) that can be read in materials as we will see.

For creating this color ramp, click on the `+` button to create a new tick and enter 0.5 for its position. Then change the color of the first tick to *RGB > (0,0,1)*, the middle one to *RGB > (0,1,0)* and the last tick to *RGB > (1,0,0)*. This gives a look like the *jet* coloring.

connect the output of the color ramp to the free output socket. Press the <kbd>N</kbd> key to open the right panel, go to *Group* tab and rename the output to what you want e.g. temp_out_ch. Note that the type of this output is color.

![geo nodes right panel](geo_nodes_right_panel.png)

Now in the *Properties > Modifier* (the far right panel) put a name for the attribute that this output creates e.g. temp_col.

![modifier attribute](modifier_attribute.png)

### Material