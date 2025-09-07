import { useCallback, useState, useRef, useEffect } from "react";
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, Handle, Position, ConnectionLineType, } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./overrides.css";

import ReactMarkdown from "react-markdown";

import NodeList from "./components/NodeList.tsx";
import CodeSidebar from "./components/CodeSidebar.tsx";
import MarkdownSidebar from "./components/MarkdownSidebar.tsx";
import Tabs from "./components/Tabs.tsx";

import Toolbar from "./components/Toolbar.tsx";
import Scope from "./components/Scope.tsx";

import FadersPage from "./components/FadersPage.tsx";

import Sonogram from "./components/Sonogram.tsx";

import CodeEditor from "./components/CodeEditor.tsx";
import NodeEditor from "./components/NodeEditor.tsx";

import { useDSP, useAudioEngine, encodeContent, decodeContent } from "./hooks.tsx";

import { motion } from "framer-motion";

async function loadFileAsString(path) {
    const res = await fetch(path);
    if (!res.ok)
        throw new Error('Failed to fetch file');
    return await res.text();
}

function Flow() {
    var initialNodes = [];
    var initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [showGraph, setShowGraph] = useState(false);

    const onPaneDoubleClick = (event: MouseEvent < HTMLDivElement >) => {
        // Get canvas position from the mouse click
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        const id = (nodes.length + 1).toString();

        const newNode = {
            id,
            type: "default",
            position: {
                x,
                y
            },
            data: {
                label: `Node ${id}`
            },
            sourcePosition: x,
            targetPosition: y,
        };

        setNodes((nds) => [...nds, newNode]);
    };

    // List of draggable items
    const draggableItems = ["~0", "~%", "~*0.5"];

    // Handle drop on canvas
    const onDrop = (event) => {
        event.preventDefault();
        const label = event.dataTransfer.getData("nodeLabel");
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;

        const gridSize = 40;
        const xm = Math.floor(x / gridSize) * gridSize;
        const ym = Math.floor(y / gridSize) * gridSize;

        const id = (nodes.length + 1).toString();
        const newNode = {
            id,
            type: "default",
            position: {
                x: xm,
                y: ym
            },
            data: {
                label
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
        };

        setNodes((nds) => [...nds, newNode]);
    };

    const onDragOver = (event) => event.preventDefault();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Example code view (read-only)
    const codeText = JSON.stringify({
        nodes,
        edges
    }, null, 2);

    // const markdown = "";

    const [running, setRunning] = useState(false);

    // const startAudio = () => {};
    // const stopAudio = () => {};

    const [code, setCode] = useState(""); // @main @[~~440]
    const dsp = useDSP();
    const audio = useAudioEngine(dsp);

    useEffect(() => {
        dsp.compile(code);
    }, [code, dsp]);

    useEffect(() => {
        const query = window.location.search.slice(1); // remove "?"

        if (query) {
            const decoded = decodeContent(query);
            if (decoded) {
                setCode(decoded);
                return;
            }
        } else {
            loadFileAsString('./code/techno.yae.txt').then((text) => {
                setCode(text)
            });
        }

    }, []);

    // loadFileAsString('./code/techno.yae.txt').then((text) => { setCode(text) });

    return (
        /*<div style={{ display: 'flex', width: '100vw' }}>*/

        <div
        style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            background: "#1e1e1e",
            flexDirection: "column",
        }}
        >
      <div>
        <div
        style={{
            width: "10wv",
            color: "#fff",
            marginLeft: 10,
            marginTop: 5
        }}
        >
          <a href="index.html">yae</a>
          <b> | yet another environment | alpha 2</b>
        </div>

        <div
        style={{
            width: "99.5%",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
            background: "#222",
        }}
        >
        <Toolbar
        onStart={audio.start}
        onStop={audio.stop}
        onToggleGraph={() => setShowGraph((prev) => !prev)}
        onShare={ () => {
            const encoded = encodeContent(code);
            const url = `${window.location.origin}${window.location.pathname}?${encoded}`;
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
        }
        status={dsp.status}
        audioRunning={audio.running}
        />

        <div style={{
            width: "410px",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "5px",
            background: "#222",
        }}>

<div style={{ width: "400px", height: "100%", background: "#111" }}>
        <Scope buffer={audio.bufferOutRef}/> 
      </div>
         
         {/*<Sonogram analyzer={audio.analyzer} /> */}
       {/*  {audio.analyzer && 
         <div style={{ width: "200px", height: "100%", background: "#111" }}>
         <Sonogram analyzer={audio.analyzer} />
       </div>
       }*/}

       </div>

      </div>

      </div>

      <div style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
        }}>

        { /* Left Sidebar */ }
        <div style={{marginLeft: "10px"}}>
          <Tabs
        tabs={[
            {
                label: "Faders",
                content: <FadersPage onFaderChange={() => {
                }} />,
            },
            {
                label: "Nodes",
                content: <NodeList draggableItems={draggableItems} />,
            },

        ]}
        />
        </div>

        { /* Nodes */ }
{ /* Nodes */ }
<div style={{
            width: "100%",
            height: "100%",
            position: "relative",
            marginLeft: "3px",
             marginRight: "3px",

        }}>
  { /* Graph editor */ }
  <motion.div
        initial={{
            opacity: 1,
            height: "50%"
        }}
        animate={{
            opacity: showGraph ? 1 : 0,
            height: showGraph ? "50%" : 0
        }}
        transition={{
            duration: 0.3
        }}
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
        }}
        >
    <NodeEditor
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
            width: "100%",
            height: "100%"
        }}
        />
  </motion.div>

  { /* Code editor */ }
  <motion.div
        initial={{
            top: 0,
            height: "50%"
        }}
        animate={{
            top: showGraph ? "50%" : "0%",
            height: showGraph ? "49%" : "99%",
        }}
        transition={{
            duration: 0.3
        }}
        style={{
            position: "absolute",
            left: 0,
            width: "100%",
        }}
        >
{/*    <CodeEditor
        value={code}
        onChange={(newCode) => setCode(newCode)}
        height="100%"
        />*/}

    <div style={{ position: "relative", width: "100%", height: "100%" }}>
  {/* Sonogram as background */}
  <div style={{ 
      position: "absolute", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      opacity: 0.75,
      zIndex: 0 
  }}>
    {audio.analyzer && <Sonogram analyzer={audio.analyzer} />}
  </div>

  {/* Code editor on top */}
  <div style={{ 
      position: "relative", 
      width: "100%", 
      height: "100%", 
      zIndex: 1 ,
      // opacity: 0.5
      mixBlendMode: "screen",
  }}>
    <CodeEditor value={code} onChange={setCode} />
  </div>
</div>

  </motion.div>
</div>




        { /* Right Sidebar */ }
<div style={{marginRight: "10px"}}>
        <Tabs
        tabs={[
            {
                label: "Docs",
                content: <MarkdownSidebar />
            },
            {
                label: "Code",
                content: <CodeSidebar codeText={codeText} />
            },
        ]}
        />
      </div>
      </div>
    </div>
    );
}

export default Flow;