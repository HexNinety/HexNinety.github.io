(async()=>{document.querySelector("build").innerHTML="build: "+await(await fetch("./build.ver")).text(),await delay(1e3);let e=e=>document.querySelector("message_info").innerHTML+=`<message><span>[ &nbsp; &nbsp; OK &nbsp; &nbsp; ]</span> ${e}</message>`;const t=["Reached target Hex90 Kernel Boot.","[    0.000000] HexNinety kernel version 0.01-experimental (buildd@lcy01-amd64-007) (gcc version 7.5.0 (Hex90 2.6.0-3hexninety1~LTS)) #170-Hex90 SMP Mon Jan 03 01:15:22 UTC 2021 (Hex90 5.15.0)","[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-5.15.0-162-experimental root=/dev/mapper/hex90--vg-root ro","[    0.000000] KERNEL supported cpus:","[    0.000000]   Intel GenuineIntel","[    0.000000]   AMD AuthenticAMD","[    0.000000]   Centaur CentaurHauls","[    0.000000] NX (Execute Disable) protection: active","[    0.000001] COLD BOOTING EXPERIMENTAL ANTI-VIRAL SYSTEM",".............................","[     OK     ] Started daily rotation of log files","[     OK     ] Reached target Timers","[     OK     ] Started Network Service","[     OK     ] Started Modem Manager","Dialing......................",".............................",".............................",".............................","Connecting...................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................",".............................","........................done.","Created slice system-getty.slice.","Created slice system-modprobe.slice.","Created slice system-serial-getty.slice.","Created slice User and Session Slice.","Started Dispatch Password …ts to Console Directory Watch.","Started Forward Password R…uests to Wall Directory Watch.","Reached target Local Encrypted Volumes.","Reached target Paths.","Reached target Remote File Systems.","Reached target Slices.","Reached target Swap.","Listening on Device-mapper event daemon FIFOs.","Listening on Process Core Dump Socket.","Listening on Journal Socket (/dev/log).","Listening on Journal Socket.","Listening on Network Service Netlink Socket.","Listening on udev Control Socket.","Listening on udev Kernel Socket.","Mounting Kernel Debug File System...","Mounting Temporary Directory (/tmp)...","Starting Load Kernel Module drm...","Starting Remount Root and Kernel File Systems...","Starting Apply Kernel Variables...","Starting Coldplug All udev Devices...","Mounted Kernel Debug File System.","Mounted Temporary Directory (/tmp).","Finished Load Kernel Module drm.","Finished Remount Root and Kernel File Systems.","Finished Apply Kernel Variables.","Starting Load/Save Random Seed...","Starting Create Static Device Nodes in /dev...","Finished Load/Save Random Seed.","Finished Create Static Device Nodes in /dev.","Reached target Local File Systems (Pre).","Reached target Local File Systems.","Started Entropy Daemon based on the HAVEGE algorithm.","Starting Journal Service...","Starting Rule-based Manage…for Device Events and Files...","Finished Coldplug All udev Devices.","Started Journal Service.","Started Rule-based Manager for Device Events and Files.","Starting Flush Journal to Persistent Storage...","Starting Network Service...","Finished Flush Journal to Persistent Storage.","Starting Create Volatile Files and Directories...","Finished Create Volatile Files and Directories.","Started Network Service.","Found device /dev/ttyS0.","Starting Network Name Resolution...","Starting Network Time Synchronization...","Starting Update UTMP about System Boot/Shutdown...","Started Network Time Synchronization.","Finished Update UTMP about System Boot/Shutdown.","Reached target System Initialization.","Started Daily Cleanup of Temporary Directories.","Reached target System Time Set.","Reached target System Time Synchronized.","Started Daily verification of password and group files.","Reached target Timers.","Listening on D-Bus System Message Bus Socket.","Reached target Sockets.","Reached target Basic System.","Started D-Bus System Message Bus.","Starting Hostname Service...","Started Hostname Service.","Starting SSH Key Generation...","Started Network Name Resolution.","Finished SSH Key Generation.","Reached target Network.","Reached target Host and Network Name Lookups.","Starting OpenSSH Daemon...","Starting Load Kernel Module drm...","Starting Permit User Sessions...","Finished Load Kernel Module drm.","Finished Permit User Sessions.","Started Getty on tty1.","Started Serial Getty on ttyS0.","Reached target Login Prompts.","Started OpenSSH Daemon.","Starting User Login Management...","Started User Login Management.","Stopped User Login Management.","Reached target Multi-User System.","Reached target Graphical Interface."];jsSources=["./assets/js/libraries/sha256.js","./assets/js/linuxWeb_js/system.js","./assets/js/linuxWeb_js/apps.js","./assets/js/linuxWeb_js/processes.js","./assets/js/linuxWeb_js/fileSystem.js"];const a=new Map([["loginScreen","./screens/loginscreen.html"],["lockScreen","./screens/lockscreen.html"],["desktop","./screens/desktop.html"]]);(async()=>{new Promise((t=>{(async()=>{for(const t of jsSources)e(`Started retrieving ${t} ...`),await page.loadJs(t),e(`Retrieved ${t} ...`);t()})()}))})(),(async()=>{new Promise((t=>{(async()=>{for(const t of a[Symbol.iterator]())e(`Started retrieving ${t[1]} ...`),screens[t[0]]={src:t[1],html:await page.getHtml(t[1])},e(`Retrieved ${t[1]} and saved it to X.screen.data.${t[0]} ...`);t()})()}))})();for(const a of t)e(a),await delay(Math.random()<=.5&&3*Math.random()*(1e3/(2*t.length))||Math.random()*(1e3/(2*t.length))),document.querySelector("message_info").lastElementChild.scrollIntoView();await delay(1e3),page.changePage("./views/X.html","system.startup()",!0)})();