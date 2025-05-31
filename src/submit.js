// submit.js

export const SubmitButton = () => {

    return (
        <div className="d-flex align-items-center justify-content-center">
            <button 
                type="submit" 
                className="text-white border border-white rounded-2"
                style={{background: '#6466f1'}}
            >
                Submit
            </button>
        </div>
    );
}