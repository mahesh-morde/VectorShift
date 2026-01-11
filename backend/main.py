from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx  # This library does the graph math

app = FastAPI()

# 1. Allow the React Frontend to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the data format we expect from React
class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'status': 'Backend is running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    # Calculate counts
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # 3. Build the Graph to check for cycles
    G = nx.DiGraph()
    
    # Add all nodes
    for node in pipeline.nodes:
        G.add_node(node['id'])
    
    # Add all connections (edges)
    for edge in pipeline.edges:
        G.add_edge(edge['source'], edge['target'])

    # 4. Check if it is a DAG (Directed Acyclic Graph)
    # If this returns True, the pipeline is valid. If False, it has a loop.
    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }