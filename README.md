# "Keep Talking and Nobody Explodes" Helper
A collection of useful utilities for the game "Keep Talking and Nobody Explodes". [Here](http://store.steampowered.com/app/341800/?snr=1_7_15__13) is the link to the game on Steam. 
**This was developed using [manual version #1](http://www.bombmanual.com/manual/1/pdf/Bomb-Defusal-Manual_1.pdf). This is not guarenteed to work with other versions.** More helpers will be added as development continues. 

## Installation
1. Clone/download repository.
2. Change directory to cloned/downloaded folder.
3. Run **npm install**.
4. Open **scripts** folder. 
5. Open either **unix.sh** (Linux/OSX) or **windows.bat** (Windows) files.

**NOTE:** NPM package will be coming soon.

## Contents
1. [Helpers](#helpers)
2. [Selecting and De-selecting](#selections)
3. [Tools Used](#tools)
4. [License](#license)

## [Helpers](#helpers)
* [Complicated Wires](#complicated_wires)

## [Complicated Wires](#complicated_wires)
**Before proceeding, you will need to know if...**
* The last digit of the bomb's serial number is even
* The bomb posseses a parallel port:
<br />
![Parallel port](assets/parallel-port.png)
* The bomb has at least 2 batteries

**You will also need to know:**
* The number of complicated wires
* The properties of each wire

**Now what?**
<br />
After starting the complicated wires sequence, simply input the number of complicated wires and press \<Enter>.
Then, select all the environment information (from above) that applies to the bomb you (or your co-op partner) are diffusing.
See [selecting and de-selecting](#selections) for instructions on choosing items from a list. Finally, for each wire select its 
properties and press \<Enter>. The decision will then be shown on the next line.

## [Selecting and De-selecting](#selections)
Selections can be made by pressing \<Space>. To select all, press \<a> and to de-select a selection, press \<i>.

## [Tools Used](#tools)
[Inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.
<br />
[Colors](https://www.npmjs.com/package/colors) - For styling the console.
<br />
[Underscore](http://underscorejs.org/) - Javascript helpers and utilities.

## [Licence](#license)
<a name='license'></a>

Copyright (c) 2016 Michael Scott.
Licensed under the MIT license.