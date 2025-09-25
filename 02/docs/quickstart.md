### Quick Start

* * *

This is a proof-of-concept / preview for a (not only) audio DSP language  
  

* * *

##### Minimal example

Use **@main** to define the main audio DSP Node:  

_white noise_  
```module
@main ~%
```

_silence_  
```module
@main ~0
```

_440Hz sinewave_  
```module
@main ~~440
```

* * *

##### Channel composition

  
**Sequence**  
Connects output of NODE1 to input of NODE2

**@\[ NODE1 NODE2 ... \]**

_ring modulation_
```module
@main @[ ~~345 ~*~~456 ]
```

  
**Parallel mix**  
Runs all nodes in parallel and sums output

**@{ NODE1 NODE2 ... }**

_additive synth with attenuation_
```module
@main @[ 
@{ 
 ~~234 
 ~~345 
 ~~456 
 ~~567
} ~*0.12345]
```  

  
**Average mix**  
Runs all nodes in parallel, outputs a sum of output divided by node size

**@/{ NODE1 NODE2 ... }**

_additive synth with ring modulation_
```module
@main @[ 
@/{ ~~234 ~~345 ~~456 ~~567} 
~*@/{ ~~135 ~~246 ~~357 ~~468} 
~*0.25 
]
```

**Simple feedback**  
Adds node output to its input + original input

**@'~~L**

_Some feedback FM_  
```module
@main 
@[
 @`@[~~L ~-_ ~*0.5 
  @/{
   @[
    ~*@[~~100 ~~L] 
    ~*~~2.2
    ]
   @[@`~~L]} 
  ] 
 ~*1.0 
]
```

* * *

##### Node definitions

You can define your node like that:

@def nodeName() = ...

and later use it:  

@main = nodeName()

_group of examples_
```module
@def ringMod() = @[ 
~~345 ~*~~456 ~*~%
]

@def additive() =  @[ 
 @/{
  ~~0.234 ~~0.345 
  ~~0.456 ~~0.567
 } 
 ~*@/{
  ~~11.35 ~~12.46 
  ~~13.57 ~~14.68
  } 
 ~*2.5 
]

@main @[ringMod() ~*additive()]
```  

* * *

##### Unsorted Examples

01 Rhythmic Synth  
```module
@def s1() = @[ Saw(1.42) ~-_ Lt(0.1) ]
@def s2() = @[ Saw(2.85) ~-_ Lt(0.1) ]

@def e1() = @[ s1()  ~*0.5 ~~L ~*10]
@def e2() = @[ s2()  ~*0.6 ~~L]

@def syn() = @[ 
    @`@/{ 
        @[ ~tanh s1() ~*@[ e1() ]]
        @[  ~tanh s2() ~*@[ e2() ]]
        } ~*~|1000 ~*0.2   ]

@main syn()
```

02 Ambient
```module
@def syn1() = @[~~0.05 ~*-1 ~-cv ~*0.028  ~|L 
~lp12(500,0.5) ~lp12(350,3.0) ~*0.1
~fft[.In .ToPol 
.Real{@[~*Lt(0.1) ~*1.5]} 
.Imag{@[@/{~|100 ~\98} ~*0.314]} 
.ToCar .Out()] 
]
@def s2() = @[
    ~schr(0.85,0.160)
    ~schr(0.85,0.127)
    ~schr(0.85,0.207)
    ~schr(0.85,0.180)
]
@def ll() = ~lp12(9500,0.1)
@def c1() = @[
    @/{
        @`@[~del(0.1116) ll() ~*0.773]
        @`@[~del(0.1188) ll() ~*0.802]
        @`@[~del(0.1277) ll() ~*0.753]
        @`@[~del(0.1356) ll() ~*0.733]
        @`@[~del(0.1427) ll() ~*0.697]
        @`@[~del(0.1491) ll() ~*0.802]
        @`@[~del(0.1563) ll() ~*0.753]
        @`@[~del(0.1617) ll() ~*0.733]
    }
    s2()
] 
@def c2() = @[
    @/{
        @`@[~del(0.2116) ll() ~*0.773]
        @`@[~del(0.2188) ll() ~*0.802]
        @`@[~del(0.2277) ll() ~*0.753]
        @`@[~del(0.2356) ll() ~*0.733]
        @`@[~del(0.2427) ll() ~*0.697]
        @`@[~del(0.2491) ll() ~*0.802]
        @`@[~del(0.2563) ll() ~*0.753]
        @`@[~del(0.2617) ll() ~*0.733]
    }
    s2()
] 
@main @[syn1() ll() ~*0.5 ~stereo{c1() ~*0.15 c2()}]
```

03 Aliasing / Reverb
```module
@def syn1() = @[~~0.1 ~-cv ~\L ~*0.1 ~fft[.In .ToPol .Imag{~*@[~\L ~\200]} .ToCar .Out()] ]
@def s2() = @[
     ~schr(0.85,0.060)
    ~schr(0.85,0.027)
    ~schr(0.85,0.107)
    ~schr(0.85,0.080)
]
@def ll() = ~lp12(15000,0.05)
@def c1() = @[
    @/{
        @`@[~del(0.1116) ll() ~*0.773]
        @`@[~del(0.1188) ll() ~*0.802]
        @`@[~del(0.1277) ll() ~*0.753]
        @`@[~del(0.1356) ll() ~*0.733]
        @`@[~del(0.1427) ll() ~*0.697]
        @`@[~del(0.1491) ll() ~*0.802]
        @`@[~del(0.1563) ll() ~*0.753]
        @`@[~del(0.1617) ll() ~*0.733]
    }
    s2()
] 
@def c2() = @[
    @/{
        @`@[~del(0.2116) ll() ~*0.773]
        @`@[~del(0.2188) ll() ~*0.802]
        @`@[~del(0.2277) ll() ~*0.753]
        @`@[~del(0.2356) ll() ~*0.733]
        @`@[~del(0.2427) ll() ~*0.697]
        @`@[~del(0.2491) ll() ~*0.802]
        @`@[~del(0.2563) ll() ~*0.753]
        @`@[~del(0.2617) ll() ~*0.733]
    }
    s2()
] 

@main @[syn1() ~stereo{c1() ~*0.1 c2()}]
```

04 Noisy / FFT
```module
@def s2() = @[
     ~schr(0.85,0.060)
    ~schr(0.85,0.027)
    ~schr(0.85,0.107)
    ~schr(0.85,0.080)
]
@def ll() = ~lp12(15000,0.05)
@def c1() = @[
    @/{
        @`@[~del(0.1116) ll() ~*0.773]
        @`@[~del(0.1188) ll() ~*0.802]
        @`@[~del(0.1277) ll() ~*0.753]
        @`@[~del(0.1356) ll() ~*0.733]
        @`@[~del(0.1427) ll() ~*0.697]
        @`@[~del(0.1491) ll() ~*0.802]
        @`@[~del(0.1563) ll() ~*0.753]
        @`@[~del(0.1617) ll() ~*0.733]
    }
    s2()
] 
@def c2() = @[
    @/{
        @`@[~del(0.2116) ll() ~*0.773]
        @`@[~del(0.2188) ll() ~*0.802]
        @`@[~del(0.2277) ll() ~*0.753]
        @`@[~del(0.2356) ll() ~*0.733]
        @`@[~del(0.2427) ll() ~*0.697]
        @`@[~del(0.2491) ll() ~*0.802]
        @`@[~del(0.2563) ll() ~*0.753]
        @`@[~del(0.2617) ll() ~*0.733]
    }
    s2()
] 
@def fftNoise() = @[~|33 @`~fft[.In() .ToCar() .Out() ] ~*~\100 ~*0.1] 

@main @[fftNoise() ~stereo{c1() ~*0.1 c2()}]
```

05 Another Rhythm
```module
@def sync() = @{~\1.0 @[~% ~*0.2]}
@def sync2() = @{~\7.0 @[~% ~*0.25]}

@def syn1() = @[ @/{ @[~|34.5 ~*~% ~~L] ~~65.4 ~~750} ~*@[~% ~*0.01 ~~L ~tanh] ]
@def r1() = @[ sync() Lt(0.1) ADSR(0.035 0.03 0.0 0.0) ]
@def rs1() = @[ syn1() ~*r1()]

@def syn2() = @[ @[ @/{ ~|75.6 ~~126.8 @[~~1203 ~*~% ] } ~tanh]  ~*@[~% ~*0.04 ~~L ] ]
@def r2() = @[ sync2() Lt(0.1) ADSR(0.035 0.03 0.0 0.0) ]
@def rs2() = @[ syn2() ~*r2()]

@main @/{rs1() rs2()}
```

##### Node List

**oscillator: sine**

```~~100```
```Sine(100)```

**oscillator: saw**

```~\100```
```Saw(100)```

**oscillator: square**

```~|100```
```Square(100)```

**oscillator: sine with input scaled to CV (0..10) mapped to 0..SR/2**

```~~L```
```SineCVLin()```

**oscillator: saw with input scaled to CV (0..10) mapped to 0..SR/2**

```~\L```
```SawCVLin()```

**oscillator: square with input scaled to CV (0..10) mapped to 0..SR/2**

```~|L```
```SquareCVLin()```

**add constant or other node output**

```~+100```
```~+~~100```

**subtract constant or other node output**

```~-100```
```~-~~100```

**multiply by constant or other node output**

```~*100```
```~*~~100```

**divide by constant or other node output**

```~/100```
```~/~~100```

**white noise generator**

```~%```

**zero generator**

```~0```
```Silence()```

**filter: 2-pole lowpass \[WIP\]**

```Lp12(100,0.71)```
```~lp12(100,0.71)```

**filter: 2-pole highpass \[WIP\]**

```Hp12(100,0.71)```
```~hp12(100,0.71)```

**filter: 2-pole bandpass \[WIP\]**

```Bp12(100,0.71)```
```~bp12(100,0.71)```

**filter: 2-pole notch \[WIP\]**

```Notch12(100,0.71)```
```~notch12(100,0.71)```

**Bipolar signal (-1..1) to unipolar (0..1)**

```~-_```
```BipToUni()```

**Unipolar signal (-1..1) to bipolar (0..1)**

```~_-```
```UniToBip()```

**Bipolar signal (-1..1) to CV (0..10)**

```~-cv```

**Unipolar signal (-1..1) to CV (0..10)**

```~_cv```

**CV (0..10) to bipolar signal (-1..1)**

```~cv-```

**CV (0..10) to unipolar signal (-1..1)**

```~cv_```

**hyperbolic tangent shaper**

```~~tanh```
```Tanh()```

**Clip in -1..1 range**

```ClipFS()```

**Less than constant (outputs 0 or 1)**

```Lt(0.5)```

**Greater than constant (outputs 0 or 1)**

```Gt(0.5)```

**Envelope follower: attack/decay (ms)**

```~envf(1,100)```
```EnvFollow(1,100)```

**Sample-and-hold: ratio**

```~sah(2)```

**Frequency shifter: freq**

```~shift(100)```

**Delay: seconds**

```Delay(1)```
```~del(1)```

**Evenly place mono channels across stereo output using linear panning:**

```~stereo{~~220 ~~330}```

**Place mono channel in stereo field with linear panning function (0..1)**

```~panlin(0.1){~%}```

**Place mono channel in stereo field with cosine panning function (0..1)**

```~pancos(0.1){~%}```

**Minimum value in the buffer**

```BMin()```

**Maximum value in the buffer**

```BMax()```

**Sum of all buffer values**

```BSum()```

**Arithmetic mean of the buffer**

```BMean()```

**Median of the buffer values**

```BMedian()```

**Variance of the buffer values**

```BVar()```

**Standard deviation of the buffer values**

```BStd()```

**Root mean square of the buffer**

```BRMS()```

**Peak (absolute maximum) value in the buffer**

```BPeak()```

**Number of zero crossings in the buffer**

```BZeroCross()```

**Crest factor (peak-to-RMS ratio) of the buffer**

```BCrest()```

**ADSR envelope: using input as gate \[WIP\]**

```ADSR(0.005 0.02 0.0 0.0)```

**RMS calculation \[WIP - currently fixed 512 sample frame\]**

```RMS()```
```~rms```

**Runnung zero-crossing rate**

```ZCR()```
```~zcr```

* * *

**Run an FFT block \[WIP currently fixed 512 samples size and no windowing\]**

```~fft\[.In() .Out()\]```

**FFT builder functions:** **Input to the internal FFT context**

```.In()```
```.In```

**Output from the internal FFT context**

```.Out()```
```.Out```

**Process real part of the internal FFT data**

```.Real{~\*1.0}```

**Process imaginary part of the internal FFT data**

```.Imag{~\*0.1}```

**From Cartesian to Polar coordinates (internal FFT data)**

```.ToPol()```
```.ToPol```

**From Polar to Cartesian coordinates (internal FFT data)**

```.ToCar()```
```.ToCar```

* * *

Use "Share" button to copy/run your code (up to 1024 bytes)  
  
[issue tracker](https://github.com/njazz/yae-alpha/issues)  
  
9.08.2025 / preview