import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Freelancer/Sidebar";

function SubmitWork() {

    const { projectId } = useParams();

    const [githubLink, setGithubLink] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {

        console.log({
            projectId,
            githubLink,
            demoLink,
            description
        });

        alert("Work Submitted Successfully");
    };

    return (

        <div className="container-fluid p-4">

            <div className="row">

                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10">

                    <div className="card shadow-sm border-0 p-4">

                        <h2>📤 Submit Work</h2>

                        <div className="mb-3 mt-4">

                            <label className="form-label">
                                GitHub Repository Link
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={githubLink}
                                onChange={(e) =>
                                    setGithubLink(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Live Demo Link
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={demoLink}
                                onChange={(e) =>
                                    setDemoLink(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Work Description
                            </label>
                            <textarea rows="5" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)  } />
                        </div>

                        <button
                            className="btn btn-success"
                            onClick={handleSubmit}>
                            Submit Project
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default SubmitWork;