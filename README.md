#raspi-temp-logger

Log temperatures as a csv file with node on the commandline

##Usage

```
node ./raspi-temp-logger/index.js
```

##Environment variables

Path to sensor output (defaults to `/sys/bus/w1/devices/28-*/w1_slave`)
```
env.FILE
```

Output folder: (defaults to `/data)
```
env.TEMPLOGPATH
``