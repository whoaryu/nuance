import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Panel,
  NodeResizer,
  Handle,
  Position,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// Custom Node Types
const CustomNode = ({ data, selected }) => {
  return (
    <div
      className={`px-4 py-3 rounded-xl border-2 shadow-lg transition-all ${
        selected
          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-white'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="font-semibold text-stone-900">{data.label}</div>
      {data.description && (
        <div className="text-xs text-stone-500 mt-1">{data.description}</div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-purple-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  )
}

const ResizableNode = ({ data, selected }) => {
  return (
    <>
      <NodeResizer
        color="#8b5cf6"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      <div
        className={`px-4 py-3 rounded-xl border-2 shadow-lg bg-gradient-to-br from-blue-50 to-white ${
          selected ? 'border-blue-500' : 'border-blue-200'
        }`}
      >
        <div className="font-semibold text-stone-900">{data.label}</div>
        <div className="text-xs text-stone-500 mt-1">Resize me!</div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

const ImageNode = ({ data }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-stone-200">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center text-4xl">
        {data.emoji}
      </div>
      <div className="px-3 py-2 bg-white">
        <div className="font-semibold text-xs text-stone-900">{data.label}</div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
  resizable: ResizableNode,
  image: ImageNode,
}

// Initial nodes with various types and positions
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: { label: 'Start Node', description: 'Custom node type' },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 300, y: 100 },
    data: { label: 'Process Node', description: 'With handles' },
  },
  {
    id: '3',
    type: 'resizable',
    position: { x: 500, y: 100 },
    data: { label: 'Resizable Node', description: 'Drag corners to resize' },
  },
  {
    id: '4',
    type: 'image',
    position: { x: 100, y: 300 },
    data: { label: 'Visual Node', emoji: '🎨' },
  },
  {
    id: '5',
    type: 'image',
    position: { x: 300, y: 300 },
    data: { label: 'Data Node', emoji: '📊' },
  },
  {
    id: '6',
    type: 'image',
    position: { x: 500, y: 300 },
    data: { label: 'Action Node', emoji: '⚡' },
  },
  {
    id: '7',
    type: 'custom',
    position: { x: 300, y: 500 },
    data: { label: 'End Node', description: 'Final destination' },
  },
]

// Initial edges with different types
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 2 },
    label: 'Smooth Step',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'step',
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    label: 'Step Edge',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'bezier',
    animated: true,
    style: { stroke: '#ec4899', strokeWidth: 2 },
    label: 'Bezier',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'straight',
    style: { stroke: '#10b981', strokeWidth: 2 },
    label: 'Straight',
  },
  {
    id: 'e3-7',
    source: '3',
    target: '7',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#f59e0b', strokeWidth: 2 },
    label: 'Animated',
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    type: 'bezier',
    style: { stroke: '#6366f1', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#6366f1',
    },
    label: 'With Arrow',
  },
]

export default function ReactFlowDemo() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [variant, setVariant] = useState('dots')

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: `e${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#8b5cf6', strokeWidth: 2 },
      }
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges],
  )

  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: 'custom',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `New Node ${nodes.length + 1}`,
        description: 'Dynamically added',
      },
    }
    setNodes((nds) => [...nds, newNode])
  }, [nodes.length, setNodes])

  const clearAll = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [setNodes, setEdges])

  const reset = useCallback(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [setNodes, setEdges])

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-stone-50 to-purple-50/30">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
        <div>
          <Link
            to="/"
            className="text-stone-600 hover:text-stone-900 transition-colors text-sm font-medium"
          >
            ← Back to Menu
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-stone-900 mt-1">
            ReactFlow Demo
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="dots">Dots</option>
            <option value="lines">Lines</option>
            <option value="cross">Cross</option>
          </select>
          <button
            onClick={addNode}
            className="px-4 py-1.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Add Node
          </button>
          <button
            onClick={reset}
            className="px-4 py-1.5 rounded-lg border border-stone-200 bg-white text-stone-700 text-sm font-medium hover:bg-stone-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-1.5 rounded-lg border border-red-200 bg-white text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </header>

      {/* ReactFlow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-stone-50"
          connectionLineStyle={{ stroke: '#8b5cf6', strokeWidth: 2 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
          }}
        >
          <Background variant={variant} gap={20} size={1} />
          <Controls
            className="bg-white border border-stone-200 rounded-lg shadow-lg"
            showInteractive={false}
          />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === 'image') return '#ec4899'
              if (node.type === 'resizable') return '#3b82f6'
              return '#8b5cf6'
            }}
            className="bg-white border border-stone-200 rounded-lg shadow-lg"
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Panel position="top-left" className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-stone-200 shadow-lg max-w-xs">
            <h3 className="font-semibold text-stone-900 mb-2">Features Demo</h3>
            <ul className="text-xs text-stone-600 space-y-1">
              <li>✓ Custom node types</li>
              <li>✓ Resizable nodes</li>
              <li>✓ Multiple edge types</li>
              <li>✓ Animated edges</li>
              <li>✓ Drag & drop nodes</li>
              <li>✓ Connect nodes</li>
              <li>✓ Mini map</li>
              <li>✓ Background patterns</li>
              <li>✓ Zoom & pan controls</li>
            </ul>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  )
}

