import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Freelancer/Sidebar";
import { submitWork } from "../../api/projectApi";
import { logInfo, logError } from "../../utils/logger";
import { toast } from "react-toastify";
function SubmitWork() {

    const { projectId } = useParams();
     const navigate = useNavigate();
    //const [submittedWork, setSubmittedWork] = useState("");
   
    const [githubLink, setGithubLink] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [description, setDescription] = useState("");

   const handleSubmit = async () => {

           if (!githubLink) {
             toast.warning("Please enter GitHub Repository Link.");

             return;
           }

             const workData = {
               submittedWork: `GitHub: ${githubLink}
                               Demo: ${demoLink}
                               Description: ${description}`,
                              };
             
            try {

                const response = await submitWork(projectId, workData);
                console.log(response.data);
                await logInfo({
                  message: "Freelancer submitted project work in GigConnect",
                  userId: user?.id || null,
                  endpoint: `/projects/${projectId}/submit`,
                  httpMethod: "PUT",
                });

                 toast.success("Work Submitted Successfully");
                 navigate("/myProjects");

                 } catch (error) {
                           console.log(error);
                           await logError({
                             message:
                               "Failed to submit project work in GigConnect",
                             userId: user?.id || null,
                             endpoint: `/projects/${projectId}/submit`,
                             httpMethod: "PUT",
                             exception:
                               error.response?.data?.message ||
                               error.message ||
                               "Failed to submit project work",
                           });
                           toast.error("Failed to submit work");
              }
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