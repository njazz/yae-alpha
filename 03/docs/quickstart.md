### Quick Start

* * *

This is a proof-of-concept / preview for a (not only) audio DSP language  
  

* * *

##### Minimal example

Use **#dsp** to define the main audio DSP Node:  

_white noise_  
```module
#dsp ~%;
```

_silence_  
```module
#dsp ~0;
```

_440Hz sinewave_  
```module
#dsp ~~440;
```

* * *

##### Channel composition

  
**Sequence**  
Connects output of NODE1 to input of NODE2

**@\[ NODE1 NODE2 ... \]**

_ring modulation_
```module
#dsp ~[ ~~345 ~*~~456 ];
```

  
**Parallel mix**  
Runs all nodes in parallel and sums output

**@{ NODE1 NODE2 ... }**

_additive synth with attenuation_
```module
#dsp ~[ 
~{ 
 ~~234 
 ~~345 
 ~~456 
 ~~567
} ~*0.12345];
```  

  
**Average mix**  
Runs all nodes in parallel, outputs a sum of output divided by node size

**@/{ NODE1 NODE2 ... }**

_additive synth with ring modulation_

```module
#dsp ~[ 
~/{ ~~234 ~~345 ~~456 ~~567} 
~*~/{ ~~135 ~~246 ~~357 ~~468} 
~*0.25 
];
```

**Simple feedback**  
Adds node output to its input + original input

```module
#dsp ~[~`~~L ~*0.1];
```

_Some feedback FM_  
```module
#dsp ~[
 ~`~[~~L ~-_ ~*0.5 
  ~/{
   ~[
    ~*~[~~100 ~~L] 
    ~*~~2.2
    ]
   ~[~`~~L]} 
  ] 
 ~*1.0 
];
```

* * *

##### Node definitions

You can define your node and re-use it later:

```module
let nodeName() = ~%; #dsp nodeName; // ...
```

Arguments are optional:
```module
let nodeName = ~0; #dsp nodeName; // ...
```
or
```module
let nodeName() = ~0; #dsp nodeName(); // ...
```

_group of examples_
```module
let ringmod = ~[ 
~~345 ~*~~456 ~*~%
];

let additive =  ~[ 
 ~/{
  ~~0.234 ~~0.345 
  ~~0.456 ~~0.567
 } 
 ~*~/{
  ~~11.35 ~~12.46 
  ~~13.57 ~~14.68
  } 
 ~*2.5 
];

#dsp ~[ringmod ~*additive];
```  

* * *

##### Unsorted Examples

00 Default example
```module
let ph() = @[Saw(2.05) ~*1.0];
let bd() = @[

~+/{@[
ph() ~-_ Lt(0.25)
ADSR(0.005 0.02 0.0 0.0 ) ~*0.5 ~tanh ~*1.3
]
@[~~0 ~*0.05]
}
~~L 
~*@[ph() ~-_ Lt(0.5) ~*ADSR(0.05 0.01 0.0 0.0 ) ] ~*4.0 ]

let hh() = @[
ph() ~-_ Gt(0.5) ADSR(0.01 0.05 0.0 0.0 ) ~tanh ~*~% ~*2
];

let bass1() = @[
ph() ~-_ Gt(0.5)
ADSR(0.05 0.01 0.0 0.1 ) ~*@[~\37 ~*0.15 ~~L] ~*2.0];

let bass2() = @[
ph() ~-_ Gt(0.75)
ADSR(0.05 0.0 0.0 0.1 ) ~*@[~\76 @[~*0.15 ~~0.97 ~-_ ~*0.15] ~~L ]  ~*1.0];

let techno() = 

@/{bd() hh() bass1() bass2()}

let v1()= @[
~+/{ 
@[~~440 
~*~~0.25 
]
~~0.3
}
~*0.5
Tanh()
~~L 
~*~~20 
~*~~0.05 
~~L 
~*0.50
];

let v2()= @[
~+/{ 
@[~~320 
~*~~02.25 
]
~~0.5
}
~*0.5
Tanh()
~~L 
~*~~10 
~*~~0.5 
~~L 
~*0.50
];

let sines() =  @[~+/{@[v1() ~*~~0.3] @[v2() ~*~~0.1]} ~*0.1 @[~~L] ];

#dsp  @[techno() ~*sines()];
```

01 Rhythmic Synth  
```module
let s1 = ~[ Saw(1.42) ~-_ Lt(0.1) ];
let s2 = ~[ Saw(2.85) ~-_ Lt(0.1) ];

let e1 = ~[ s1  ~*0.5 ~~L ~*10];
let e2 = ~[ s2  ~*0.6 ~~L];

let syn = ~[ 
    ~`~/{ 
        ~[ ~tanh s1 ~*~[ e1 ]]
        ~[  ~tanh s2 ~*~[ e2 ]]
        } ~*~|1000 ~*0.2   ];

#dsp syn;
```

02 Ambient
```module
let syn1() = @[~~0.05 ~*-1 ~-cv ~*0.028  ~|L 
~lp12(500,0.5) ~lp12(350,3.0) ~*0.1
~fft[.In .ToPol 
.Real{@[~*Lt(0.1) ~*1.5]} 
.Imag{@[@/{~|100 ~\98} ~*0.314]} 
.ToCar .Out()] 
];
let s2() = @[
    ~schr(0.85,0.160)
    ~schr(0.85,0.127)
    ~schr(0.85,0.207)
    ~schr(0.85,0.180)
];
let ll() = ~lp12(9500,0.1);
let c1() = @[
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
];
let c2() = @[
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
];
#dsp @[syn1() ll() ~*0.5 ~stereo{c1() ~*0.15 c2()}];
```

03 Aliasing / Reverb
```module
let syn1() = @[~~0.1 ~-cv ~\L ~*0.1 ~fft[.In .ToPol .Imag{~*@[~\L ~\200]} .ToCar .Out()] ];
let s2() = @[
     ~schr(0.85,0.060)
    ~schr(0.85,0.027)
    ~schr(0.85,0.107)
    ~schr(0.85,0.080)
];
let ll() = ~lp12(15000,0.05);
let c1() = @[
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
]; 
let c2() = @[
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
];

#dsp @[syn1() ~stereo{c1() ~*0.1 c2()}];
```

04 Noisy / FFT
```module
let s2() = @[
     ~schr(0.85,0.060)
    ~schr(0.85,0.027)
    ~schr(0.85,0.107)
    ~schr(0.85,0.080)
]
let ll() = ~lp12(15000,0.05)
let c1() = @[
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
let c2() = @[
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
let fftNoise() = @[~|33 @`~fft[.In() .ToCar() .Out() ] ~*~\100 ~*0.1] 

#dsp @[fftNoise() ~stereo{c1() ~*0.1 c2()}]
```

05 Another Rhythm
```module
let sync1 = ~{~\1.0 ~[~% ~*0.2]};
let sync2 = ~{~\7.0 ~[~% ~*0.25]};

let syn1 = ~[ ~/{ ~[~|34.5 ~*~% ~~L] ~~65.4 ~~750.0} ~*~[~% ~*0.01 ~~L ~tanh] ];
let r1 = ~[ sync1 Lt(0.1) ]; //ADSR(0.035 0.03 0.0 0.0) ];
let rs1 = ~[ syn1 ~*r1];

let syn2 = ~[ ~[ ~/{ ~|75.6 ~~126.8 ~[~~1203.0 ~*~% ] } ~tanh]  ~*~[~% ~*0.04 ~~L ] ];
let r2 = ~[ sync2 Lt(0.1) ]; //ADSR(0.035 0.03 0.0 0.0) ];
let rs2 = ~[syn2 ~*r2];

#dsp ~/{rs1 rs2};
```

06 Ambient 2
```module
let s2() = @[
    ~schr(0.85,0.060)
    ~schr(0.85,0.027)
    ~schr(0.85,0.107)
    ~schr(0.85,0.080)
]
let ll() = ~lp12(15000,0.05)
let c1() = @[
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
let c2() = @[
    @/{
        @`@[~del(0.11161) ll() ~*0.773]
        @`@[~del(0.11881) ll() ~*0.802]
        @`@[~del(0.12771) ll() ~*0.753]
        @`@[~del(0.13561) ll() ~*0.733]
        @`@[~del(0.14271) ll() ~*0.697]
        @`@[~del(0.14911) ll() ~*0.802]
        @`@[~del(0.15631) ll() ~*0.753]
        @`@[~del(0.16171) ll() ~*0.733]
    }
   s2()
] 

#dsp @[~stereo{
@[~\400 ~*@[~~0.17 ~-_]  ~hp12(50,0.1) c1() ClipFS() ~lp12(1700,0.1) ~*2.0 ~tanh c1()] 
~stereo{
@[
@[~\202 ~*@[~% ~bp12(20,1.5) ~-_] ~*0.2 ~lp12(1700,0.1)] ~*0.5 ~tanh
c2()
]
@[~\270 ~*@[~~-0.09 ~-_] ~hp12(50,0.1) ~lp12(1700,0.1) ~*0.5 ~tanh c1()]
}
@[~\802 ~*@[~~-0.13 ~-_] ~hp12(50,0.1) ~lp12(1700,0.1) ~*2.0 ~tanh c2()]
} ~tanh ~*0.25]
```

* * *

### Syntax overview  

Full language syntax is defined by procedural macros.  
It is done by set external modules or as macro:  
PEG builder -> object builder

### Keywords

**keyword** is always a convention.  

**NB** currently macro name \__NAME would be accessible as NAME kword  

### Modules

Currently the root library is supposed to implicitly loaded all time:  
```import "builtin";```

list of modules:  

- core  
- core/let
- core/data
- core/new
- core/macros
- core/literals
- core/repl
- core/adt
- dsp
- ui

### Containers

**• NB •** array and map ctors for variables are using \[,\] syntax, {} is reserved for some code block
i.e:
```
let freqs = [1, 2, 3]
let map = ["a":1, "b":2]
```

Note commas here, but ```dsp ~[Sine() Tanh()];``` sequence is with spaces.

### General syntax

```EXPRESSION ; [EXPRESSION ; ...]```  

**• NB •** semicolons are required

Internally, every expression is a ()->T builder (except literals returning T value, to be fixed later)

### Commonly used tokens

( ) node args  
{ } node contents 
= definition  
-> macro binding  
_ default value in expression rhs

--- 

#### ••• lib: core 

#### import  

```import STRING_LITERAL;```

```import "builtin";``` 
 
#### macro  

TODO: macro syntax

```
// 1. PEG -> Builder syntax
macro {
  "test"
  ->
  ~100.0
};
```

```macro Macro1(arg) { "Test" -> SineOsc(441) };```

TODO:
```
// 2. let-like syntax:
macro name(arg1 [,...]) { ~*arg1}
```

---  

#### ••• lib: core/let 

Next level is "core" library with the actual language features

#### let

This is a constant definition. 

```let node(arg1) = SineOsc(arg1);```

let defines auto-generated PEG & output
More like a "compile-time" macro

uses code block and outputs last expression

```let fn(arg1) { let synth = SineOsc(arg) >> ~*0.5; synth; }```

**• NB •**
expands to internal ```#_push_block / #_pop_block```

expands to some code block object:

```struct Block(ReturnType, e) { elements:Vector(AnyBuilder) = e; }```

that returns ReturnType builder  
**• NB •** needs clear Any* in host api

---  

#### ••• lib:  core/data 

Custom data structures and reactive bindings  

##### struct  
**• NB •** this is a type definition

```
struct Example(arg1 [:Type] [,...]) { 
  public d1 : DSP; 
  var f1: Float = arg1 
};
```

examples
alias (as it uses PEG):
```let T2 = Example```

all current DSP nodes are builder objects returning AnyDSPNode  
for custom type:  

```let E1 = build Example```  

so E1 is now ()->Example  

```let Instance1 = new Example```  
```let Instance1 = Example();```  

**• NB •** dot operator? operator=? minimal operator set

**• NB •** vectors and maps?

##### var   
T  
_mutable_

##### public  

reactive Value<T>   
_mutable_  
    
##### binding   

reactive Binding<T>   
_mutable_   


**• NB •** get Binding<T> by referencing Value<T> with \$:  

```
// system-defined
public F0 : Float = 0;

let DSP = ~$F0;
```

---   

#### ••• lib: core/new   

##### new  

##### builder  

---

#### ••• lib: core/macros  

```#dsp``` -> ```let DSP = ```  
```#par``` -> ```let Par = ```  
```#ui``` -> ```let UI =```  

---

**• NB •** some kind of sequence of action, probably using {} node contents:

```
let Op1(e: Example) { 
e.f1 = 1;
};
```


**macro**  

definition  

**• NB •** macro expansion: #macro_name or #macro_name(args...)  

**• NB •** current macro system is PEG -> any builder
expand for simple c-like macros:

```
#macro { parser.Match("dsp") >> parser.AnyExpression() -> eval("let DSP = " + args[1]) };
```

**• NB •** later PEG -> AST macros

**• NB •** TODO:  

```
#fb(args...) -> { let arg = Feedback(); [contents] }  
```

---

#### ••• lib: core / literals

**• NB •** those usually return constant T values, not builders

123 / 123.456 
number, returns Int or Float constant value

"String" 
string literal, returns String

\$varname binding

ident identifier / quote when in a definition

---

#### ••• lib: core/repl

```#repl (tag) {...} ```
always run / update when this part is edited

```#scope (tag) {...} ```
manually callable, excluded in non-repl mode

```#eval (tag) ```
runs existing named scope here

```##(tag) {...} manually callable ```
```###(tag) {...} repl ```

no tag will reference as line number

Traditional ctrl+enter: add #scope {} and run

short repl, eval, scope

```
repl("main") {
  // runs on edit
}

scope("init") {
  // callable manually
}

eval "init"   // evaluate named scope inline
```

---

#### ••• lib: core/adt

```
type Name(params...) {
    Variant(fields...);
    Variant2(fields...);
}
```

```
type Maybe(T) {
    None;
    Some(value:T): Type = T(value);
}
```

```
let v = Maybe<Float>.Some(10);
```

---

#### ••• lib: dsp 

**dsp composition tokens**  
~\[...] sequence  
~/{...} parallel  
~/{...} parallel -> average  
~+\{...} parallel - mix  
~-{...} parallel subtract  
~\*{...}  
~/{...}  
~\`... One-sample feedback   
~\`\`... Block-sized feedback  
~0.0 / ~$... Constant float / Binding\<float\>  

**DSP infix ops**

```A >> B``` 
output a -> input b

```A << B```
output b -> input a
NB: is not needed?

```+ - * /``` same ase ~+{} etc

---

#### ••• lib: dsp/probe

DSP Scope probe

```#?(name) probe ```

```#?("name with spaces") ```

```#?? default probe ```

uses last one in source code
if not defined, there is somewhat like '#??DSP' internally, implicitly, i.e:
```let DSP = #??[ user code...]```

* * *

Use "Share" button to copy/run your code (up to 1024 bytes)  
  
[issue tracker](https://github.com/njazz/yae-alpha/issues)  
  
9.08.2025 / preview  
19.02.2026 / a3
