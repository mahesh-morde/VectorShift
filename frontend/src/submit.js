import { useStore } from './store';
import { shallow } from 'zustand/shallow';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            alert(`
                Pipeline Analysis Results:
                ---------------------------
                Number of Nodes: ${data.num_nodes}
                Number of Edges: ${data.num_edges}
                Is Valid DAG: ${data.is_dag ? "Yes ✅" : "No ❌ (Cycle Detected)"}
            `);

        } catch (error) {
            console.error(error);
            alert("Error: Could not connect to the backend. Is it running?");
        }
    };

    return (
        <div className="submit-container">
            <button
                type="submit"
                onClick={handleSubmit}
                className="submit-button">
                Submit Pipeline
            </button>
        </div>
    );
};