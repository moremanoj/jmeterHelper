import { useState } from 'react';
import WorkflowRespContext from './workflowRespContext';

const WorkflowState = (props) => {
    const [apiList, setApiList] = useState([]);
    const [apiResp, setApiResp] = useState([]);
    const [workflowName, setWorkflowName] = useState("");
    const [workflows, setWorkflows] = useState([]);

    return (
        <WorkflowRespContext.Provider 
            value={{apiList, setApiList, apiResp, setApiResp, workflowName, setWorkflowName, workflows, setWorkflows}}>
            {props.children}
        </WorkflowRespContext.Provider>
    )
}

export default WorkflowState