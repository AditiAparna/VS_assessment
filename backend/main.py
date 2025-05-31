from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List
from collections import defaultdict

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    # Create adjacency list
    graph = defaultdict(list)
    for edge in edges:
        source = edge['source']
        target = edge['target']
        graph[source].append(target)
        print(f"Added edge: {source} -> {target}")
    
    print("Graph adjacency list:", dict(graph))
    
    # Check for cycles using DFS
    visited = set()
    path = set()
    
    def has_cycle(node):
        print(f"Checking node {node}, current path: {path}")
        visited.add(node)
        path.add(node)
        
        for neighbor in graph[node]:
            print(f"Checking neighbor {neighbor} of node {node}")
            if neighbor not in visited:
                if has_cycle(neighbor):
                    print(f"Found cycle at {neighbor}")
                    return True
            elif neighbor in path:
                print(f"Found cycle: {neighbor} already in path {path}")
                return True
                
        path.remove(node)
        return False
    
    # Check each node as a potential start point
    for node in [node['id'] for node in nodes]:
        print(f"\nStarting DFS from node: {node}")
        if node not in visited:
            if has_cycle(node):
                print(f"Graph contains cycle starting from {node}")
                return False
    
    print("No cycles found - valid DAG")
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: Dict = Body(...)):
    print("\nReceived pipeline data:")
    print("Nodes:", data.get('nodes', []))
    print("Edges:", data.get('edges', []))
    
    nodes = data.get('nodes', [])
    edges = data.get('edges', [])
    
    is_dag_result = is_dag(nodes, edges)
    print(f"\nDAG check result: {is_dag_result}")
    
    return {
        'num_nodes': len(nodes),
        'num_edges': len(edges),
        'is_dag': is_dag_result
    }
