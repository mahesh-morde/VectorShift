from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'status': 'Backend is running'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    G = nx.DiGraph()
    
    for node in pipeline.nodes:
        G.add_node(node['id'])
    
    for edge in pipeline.edges:
        G.add_edge(edge['source'], edge['target'])

    is_dag = nx.is_directed_acyclic_graph(G)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }