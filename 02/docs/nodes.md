## oscillators

**zero generator**

```~0```
```Silence()```

**oscillator: sine**

```~~100```
```Sine(100)```

**oscillator: saw [a: anti-aliased]**

```~\100```
```Saw(100)```
```~\a100```
```SawAA(100)```

**oscillator: square [a: anti-aliased]**

```~|100```
```Square(100)```
```~|a100```
```SquareAA(100)```

**oscillator: triangle [a: anti-aliased]**

```~^100```
```Triangle(100)```
```~^a100```
```TriangleAA(100)```


**oscillator: sine with input scaled to CV (0..10) mapped to 0..SR/2**

```~~L```
```SineCVLin()```

**oscillator: saw with input scaled to CV (0..10) mapped to 0..SR/2 [a: anti-aliased]**

```~\L```
```SawCVLin()```
```~\aL```
```SawAACVLin()```

**oscillator: square with input scaled to CV (0..10) mapped to 0..SR/2 [a: anti-aliased]**

```~|L```
```SquareCVLin()```
```~|aL```
```SquareAACVLin()```

**oscillator: triangle with input scaled to CV (0..10) mapped to 0..SR/2 [a: anti-aliased]**

```~^L```
```TriangleCVLin()```
```~^aL```
```TriangleAACVLin()```

## noise

**white noise generator / 8 bit precision**

```~%8```

**white noise generator / 16 bit precision**

```~%16```

**white noise generator / 24 bit precision**

```~%24```

**white noise generator / 32 bit precision**

```~%32```

## chaotic

**chaotic generator: logistic map**

```~logistic```
```LogisticMap()```

**chaotic generator: tent map**

```~tent```
```TentMap()```

**chaotic generator: Lorenz attractor**

```~lorenz```
```LorenzAttractor()```

**chaotic generator: Rossler attractor**

```~rossler```
```RosslerAttractor()```

**chaotic generator: Chuas Circuit**

```~chuas```
```ChuasCircuit()```

## math

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

## logic

**Less than constant (outputs 0 or 1)**

```Lt(0.5)```

**Greater than constant (outputs 0 or 1)**

```Gt(0.5)```

## unary

**hyperbolic tangent shaper**

```~~tanh```
```Tanh()```

**Clip in -1..1 range**

```ClipFS()```

**input ^ power**

```~pow()```
```Pow()```

**Bipolar value (-1..1) input ^ power waveshaper**

```~bippow()```
```BipPow()```

**Sign**

```~sign```

**Absolute value**

```~abs```
```Abs()```

## filters

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

## converters

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

**Bipolar signal (-1..1) to dB**  
  
```BipTodB()```
```~-db```

**dB to Bipolar signal (-1..1)**  
  
```dBToBip()```
```~db-```

**Unipolar signal (0..1) to range**  
  
```~_r(0,2)```
```UniToRange(0,2)```

**Bipolar signal (-1..1) to range**  
  
```~_r(0,2)```
```BipToRange(0,2)```

**Range to unipolar signal (0..1)**  
  
```~r_(0,2)```
```RangeToUni(0,2)```

**Range to bipolar signal (-1..1)**  
  
```~_r(0,2)```
```RangeToBip(0,2)```

**scale range (a..b) to (c..d)**  
  
```~rr(-2,2,0,2)```
```Scale(0,2)```

## fx

**Sample-and-hold: ratio**

```SAH(2)```
```~sah(2)```

**Frequency shifter: freq**

```Shift(100)```
```~shift(100)```

**Delay: seconds**

```Delay(1)```
```~del(1)```

## spatialisation

**Evenly place mono channels across stereo output using linear panning:**

```~stereo{~~220 ~~330}```

**Place mono channel in stereo field with linear panning function (0..1)**

```~panlin(0.1){~%}```

**Place mono channel in stereo field with cosine panning function (0..1)**

```~pancos(0.1){~%}```

## buffer

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

## envelopes

**ADSR envelope: using input as gate \[WIP\]**

```ADSR(0.005 0.02 0.0 0.0)```

**Envelope follower: attack/decay (ms)**

```~envf(1,100)```
```EnvFollow(1,100)```

## analysis


**RMS calculation \[WIP - currently fixed 512 sample frame\]**

```RMS()```
```~rms```

**Runnung zero-crossing rate**

```ZCR()```
```~zcr```

**EMA**

```EMA(100)```

## fft

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

## debug

**Node -> Main oscilloscope**
```@??```

