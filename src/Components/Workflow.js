import React, { useState, useEffect, useContext } from "react";
import ShowWorkflow from "./ShowWorkflow";
import axios from "axios";
import Response from "./Response";
import api from "./MockAPI/apiAll";
import workflowContext from "../context/workflowContext/workflowRespContext";
import AutoComplete from "./Utilities/Autocomplete/AutoComplete";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import { Accordion, Col, Modal, Row, Table, Button } from "react-bootstrap";
import Select from "react-select";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import {
  getApiList,
  getEnvironmenList,
  getModuleList,
} from "../dummy-data/apiData";

function Workflow() {
  const [addApiBox, setAddApiBox] = useState(false);
  const [editBox, setEditBox] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const context = useContext(workflowContext);
  const {
    apiList,
    setApiList,
    apiResp,
    setApiResp,
    workflowName,
    setWorkflowName,
    workflows, 
    setWorkflows
  } = context;

  const [apiAll, setApiAll] = useState([]);

  const [apiName, setApiObj] = useState(null);
  const [apiPath, setApiPath] = useState("");
  const [httpMethod, setHttpMethod] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [apiAllNames, setApiAllNames] = useState([]);
  const [environment, updateEnvironment] = useState("");
  const [module, updateModule] = useState("");
  const [moduleApi, updateModuleApiList] = useState([]);
  const [options, updateOptions] = useState([]);
  const [show, toogleModal] = useState(false);
  const [workflowApiList, updateWorkflowApiList] = useState([]);
  const [workflowDetails, updateWorkflowDetails] = useState({});
  const [reqFiledsArr, setReqFiledsArr] = useState([]);
  const [requestFileds, updateReqFileds] = useState("");
  const [mappingArr, updateMappingArr] = useState([]);
  const [environmentList, setEnvironmentList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [apiDetails, setApiDetails] = useState(null);
  // const workflowList = {
  //   dev: {
  //     workFlowDetails: [
  //       {
  //         workflowName: "dev1",
  //         apiList: [
  //           {
  //             name: "get",
  //             details: {
  //               fields: { name: "" },
  //             },
  //           },
  //           {
  //             name: "post",
  //             details: {
  //               fields: { name: "", address: "", age: "" },
  //             },
  //           },
  //           {
  //             name: "delete",
  //             details: {
  //               fields: { id: "" },
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         workflowName: "dev2",
  //         apiList: [
  //           {
  //             name: "post",
  //             details: {
  //               fields: { name: "", address: "", age: "" },
  //             },
  //           },
  //           {
  //             name: "delete",
  //             details: {
  //               fields: { id: "" },
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   uat: {
  //     workFlowDetails: [
  //       {
  //         workflowName: "uat1",
  //         apiList: [
  //           {
  //             name: "get",
  //             details: {
  //               fields: { name: "" },
  //             },
  //           },
  //           {
  //             name: "post",
  //             details: {
  //               fields: { name: "", address: "", age: "" },
  //             },
  //           },
  //           {
  //             name: "delete",
  //             details: {
  //               fields: { id: "" },
  //             },
  //           },
  //         ],
  //       },
  //       {
  //         workflowName: "uat2",
  //         apiList: [
  //           {
  //             name: "post",
  //             details: {
  //               fields: { name: "", address: "", age: "" },
  //             },
  //           },
  //           {
  //             name: "delete",
  //             details: {
  //               fields: { id: "" },
  //             },
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // };

  // const moduleApiList = [
  //   // {
  //   //   moduleId: "module-1",
  //   //   apiId: Date.now(),
  //   //   apiName: "Get User List",
  //   //   reqFields: {},
  //   //   resFileds: [
  //   //     {
  //   //       userId: Date.now(),
  //   //       userName: "USER 1",
  //   //     },
  //   //     {
  //   //       userId: Date.now(),
  //   //       userName: "USER 2",
  //   //     },
  //   //   ],
  //   // },
  //   {
  //     moduleId: "module-2",
  //     apiId: Date.now(),
  //     apiName: "Get User List module 2",
  //     reqFields: {},
  //     resFileds: [
  //       {
  //         userId: Date.now(),
  //         userName: "module-2USER 1",
  //       },
  //       {
  //         userId: Date.now(),
  //         userName: "module-2USER 2",
  //       },
  //     ],
  //   },
  //   {
  //     moduleId: "module-2",
  //     apiId: Date.now(),
  //     apiName: "Create User",
  //     reqFields: { id: Math.random(), name: "nikhil", age: 29 },
  //     resFileds: { id: Math.random(), name: "nikhil", age: 29 },
  //   },
  // ];

  let navigate = useNavigate();

  useEffect(function reload() {
    // Mocking Resp
    setApiAll([...api]);
    setApiAllNames([...api].map((item) => item.apiName));
  }, []);

  useEffect(() => {
    const envList = getEnvironmenList();
    setEnvironmentList(envList);
  }, []);

  function showApiInputBox(switchBox) {
    if (switchBox === true) {
      setApiObj("");
      setApiPath("");
      setHttpMethod("");
      setRequestBody("");
    }
    setAddApiBox(switchBox);
    setEditBox(false);
  }

  // function disableAdd() {
  //   if (
  //     apiName &&
  //     apiName.length > 0 &&
  //     apiPath &&
  //     apiPath.length > 0 &&
  //     httpMethod &&
  //     httpMethod.length > 0
  //   ) {
  //     return false;
  //   }
  //   return true;
  // }

  function disableWorkflow() {
    if (workflowName && apiList && apiList.length > 0) {
      return false;
    }
    return true;
  }

  // function autoCompleteApi(val) {
  //   setApiObj(val);
  //   let selectedApiIndex = apiAllNames.findIndex((item) => item === val);
  //   console.log("apiAllNames=====>",apiAllNames, selectedApiIndex);
  //   if (selectedApiIndex !== -1) {
  //     setApiPath(apiAll[selectedApiIndex].apiPath);
  //     setHttpMethod(apiAll[selectedApiIndex].httpMethod);
  //     setRequestBody(apiAll[selectedApiIndex].requestBody);
  //   } else {
  //     setApiPath("");
  //     setHttpMethod("");
  //     setRequestBody("");
  //   }
  // }

  function addApi(payload) {

    const { apiDetails } = payload;

    // console.log(apiName, apiList?.length);

    // const apilist = apiList.length<=0 ? 
    //                 setApiList(apiDetails): 
    //                 setApiList([...apiList, 
    //                   ...apiDetails.map((api) => {
    //                       return api.apiId === apiName.value ? api : null })
    //                       .filter(e=>e)])

    setApiList(apiDetails)
    setApiObj("");
    setApiPath("");
    setHttpMethod("");
    setRequestBody("");

    setApiResp([]);
    showApiInputBox(false);
  }

  function deleteApi(index) {
    workflowApiList.findIndex(obj => obj.apiName === apiName.label )
    setApiList(apiList.filter((_, ind) => ind !== index));
  }

  function editApi(index) {
    showApiInputBox(true);
    setEditIndex(index);
    apiList.forEach((item, ind) => {
      if (ind === index) {
        setApiObj(item.apiName);
        setApiPath(item.apiPath);
        setHttpMethod(item.httpMethod);
        setRequestBody(item.requestBody);
      }
    });
    setEditBox(true);
  }

  function callApi() {
    apiList.forEach((api) => {
      switch (api.httpMethod) {
        case "GET":
          axios.get(api.apiPath).then((response) => {
            console.log("GET response.data=====>",response.data[0]);
            setResponseReceived({apiId: api.apiId, resp: response.data[0], status: true});
          }).catch((err) => {
            setResponseReceived(err.data, false);
          });
          break;
        case "POST":
          axios.post(api.apiPath, api.requestBody).then((response) => {
            console.log("POST response.data=====>",response.data);
            setResponseReceived({apiId: api.apiId, resp: response.data, status: true});
            // setApiResp([...apiResp, [...response.data]]);
          }).catch((err) => {
            setResponseReceived(err.data, false);
          });
          break;
        case "PUT":
          axios.put(api.apiPath, api.requestBody).then((response) => {
            console.log("PUT response.data=====>",response.data);
            setResponseReceived({apiId: api.apiId, resp: response.data, status: true});
            // setApiResp([...apiResp, [...response.data]]);
          }).catch((err) => {
            setResponseReceived(err.data, false);
          });
          break;
        case "DELETE":
          axios.delete(api.apiPath).then((response) => {
            console.log("DELETE response.data=====>",response.data);
            // setResponseReceived([{ resp: "Not Available" }], true);
            setResponseReceived({apiId: api.apiId, resp: response.data, status: true});
            // setResponseReceived(response.data);
            // setApiResp([...apiResp, ]);
          }).catch((err) => {
            setResponseReceived(err.data, false);
          });
          break;
        default:
          break;
      }
    });
    navigate("/workflows");
  }
  function setResponseReceived(respReceived, status) {
    const apiResponse = apiResp.slice();
    if (respReceived && respReceived.length > 0) {
      setApiResp([...apiResponse, [...respReceived]]);
    } else {
      setApiResp([...apiResponse, [respReceived]]);
    }
  }
  // console.log(apiName, apiPath, httpMethod, requestBody);

  const handleEnvironmentChange = (e) => {
    updateEnvironment(e.target.value);
    const list = getModuleList(e.target.value);
    setModuleList(list.moduleList);
    updateModule("");
    setApiObj(null);
  };

  const handleModuleChange = (e) => {
    setApiObj(null);
    const list = getApiList(e.target.value);
    let arr = list.apiList;
    let optionsArr = arr.map((list) => {
      return { value: list.apiId, label: list.apiName };
    });
    updateModuleApiList(arr);
    updateOptions(optionsArr);
    updateModule(e.target.value);
  };

  useEffect(() => {
    createReqFildesArr();
  }, [workflowApiList]);

  const createReqFildesArr = () => {  
    if(workflowApiList.length>1) {
      const currentApiKeysArr = workflowApiList[workflowApiList.length - 1].requestField;
      const index = workflowApiList.findIndex(
            (obj) => obj.apiName == apiName.label
          );
      console.log("arr[index - 1]", workflowApiList, index);
      const previousApiResponseKeysArr = workflowApiList[index].responseField;

      setReqFiledsArr(previousApiResponseKeysArr);

      const fieldMappingArr = previousApiResponseKeysArr.map((val, i) => {
        return { key: val };
      });

      fieldMappingArr.map((obj) => {
        currentApiKeysArr.map((val) => {
          obj.value = val;
        });
      });

      console.log("workflowApiList====>",workflowApiList);
      updateMappingArr(fieldMappingArr);
      showModal();
    } else {
      console.log("workflowApiList not ready to sync");
    }
  };
  const showModal = () => {
    if (workflowApiList.length == 1) {
      let reuestPaylod = {  
        id: Math.random(),
        name: workflowName,
        apiDetails: [
          {
            apiId: "",
            sequenceNumber: "",
            nextAPI: "",
            previousAPI: "",
            // fieldMapping:{
            // currentAPIRequestField:"PreviousAPIResponseField"
            // }
          },
        ],
      };
      // console.log("Request Payload===>", reuestPaylod);
    } else {
      toogleModal(!show);
    }
  };

  const getApiDetails = (val) => {
    // return moduleApi.find((obj) => obj.apiName == val.label);
    const apiName = moduleApi.find((obj) => obj.apiName == val.label);
    console.log("getApiDetails=====>", val, apiName) ;
    let arr = [...workflowApiList];
    arr.push(apiName);
    updateWorkflowApiList(arr);
  };

  // render api details of created workflow
  const renderApiDetailsTable = () => {
    return (
      <div style={{ marginTop: 20 }}>
        <h5>Selected APIs</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>API ID</th>
              <th>API Name</th>
              <th>Request Fileds</th>
              <th>Response Fileds</th>
            </tr>
          </thead>
          <tbody>
            {workflowApiList.map((obj) => {
              return (
                <tr>
                  <td>{obj.apiId}</td>
                  <td>{obj.apiName}</td>
                  <td>{JSON.stringify(obj.requestField)}</td>
                  <td>{JSON.stringify(obj.responseField)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const closeModal = () => {
    toogleModal(false);
  };

  const addWorkflowtoList = (payload) => {
    if(workflows && workflows.length> 0) {
      setWorkflows([...workflows, payload]);
    } else {
      setWorkflows([payload]);
    }
  }

  const getUniqueId = () => {
    const date = new Date();
    let components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ];
    return components.join("");
  }

  const handleCreateWorkflow = () => {
    let data = workflowApiList.map((obj, index) => {
      let mappinObj = {};
      if (index == 0 && index + 1 == 1) {
        obj.nextAPI = workflowApiList[1].apiId;
        obj.previousAPI = "";
      } else {
        if (workflowApiList[index + 1] !== undefined) {
          obj.nextAPI = workflowApiList[index + 1].apiId;
        } else {
          obj.nextAPI = "";
          // obj.fieldMapping = mappingArr;

          for (let i = 0; i < mappingArr.length; i++) {
            let data = mappingArr[i]?.key;
            mappinObj[`${data}`] = workflowApiList[index - 1].requestField.find(
              (val) => val == data
            );
          }
          obj.fieldMapping = mappinObj;
        }

        if (workflowApiList[index - 1] !== undefined) {
          obj.previousAPI = workflowApiList[index - 1].apiId;
        } else {
          obj.previousAPI = "";
        }
      }
      return obj;
    });
    let workflowPayload = {
      id: getUniqueId(),// Math.random(),
      name: workflowName,
      apiDetails: [...data],
    };
    console.log("Workflow payload==>", workflowPayload);
    closeModal();
    updateMappingArr([]);
    // setApiObj(null);
    setReqFiledsArr([]);
    addApi(workflowPayload);
    addWorkflowtoList(workflowPayload);

    // setApiList(reuestPaylod.apiDetails);
  };

  // const createFieldMapping = () => {
  //   let newWorkflowApiList = [...workflowApiList];
  //   let fieldMapping = {};
  //   const lastIndex = newWorkflowApiList.length - 1;
  //   let currentApiObj = newWorkflowApiList[lastIndex];
  //   currentApiObj.reqFields = newWorkflowApiList[lastIndex - 1].responseField;
  //   fieldMapping[requestFileds] = currentApiObj.reqFields[requestFileds];
  //   if (currentApiObj.fieldMapping) {
  //     currentApiObj.fieldMapping = {
  //       ...currentApiObj.fieldMapping,
  //       ...fieldMapping,
  //     };
  //   } else {
  //     currentApiObj.fieldMapping = { ...fieldMapping };
  //   }

  //   newWorkflowApiList[lastIndex] = currentApiObj;

  //   updateWorkflowApiList(newWorkflowApiList);
  //   console.log("fieldMapping===>", fieldMapping, newWorkflowApiList);
  // };

  const updateMappingFields = (data, index) => {
    let newMappingArr = [...mappingArr];
    newMappingArr[index].value = data;
    updateMappingArr(newMappingArr);
  };

  const renderApiMappingTable = () => {
    if (workflowApiList.length > 1) {
      let newWorkflowApiList = [...workflowApiList];
      let fieldMapping = {};
      const lastIndex = newWorkflowApiList.length - 1;
      return (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Request Fileds</th>
              <th>Response Fileds</th>
            </tr>
          </thead>
          <tbody>
            {mappingArr.map((mapingObj, index) => (
              <tr>
                <td>{mapingObj.key}</td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    value={mapingObj.value}
                    onChange={(e) => {
                      updateMappingFields(e.target.value, index);
                    }}
                  >
                    <option value="">Select</option>
                    {reqFiledsArr.map((val) => {
                      return <option value={val}>{val}</option>;
                    })}
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    } else return null;
  };

  return (
    <>
      <form className="mb-2">
        <h1>Create Workflow</h1>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Workflow Name</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter workflow name"
                value={workflowName}
                onChange={(e) => {
                  setWorkflowName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form>
              <Form.Label>Environment</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={environment}
                onChange={(e) => {
                  handleEnvironmentChange(e);
                }}
              >
                <option value="">Select</option>
                {environmentList.map((obj) => (
                  <option value={obj.environmenId}>
                    {obj.enviornmentName}
                  </option>
                ))}
              </Form.Select>
            </Form>
          </Col>
        </Row>

        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Add API</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Form>
                  <Form.Label>Module</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={module}
                    onChange={(e) => {
                      handleModuleChange(e);
                    }}
                  >
                    <option value="">Select</option>
                    {moduleList.map((obj) => {
                      return (
                        <option value={obj.moduleId}>{obj.moduleName}</option>
                      );
                    })}
                  </Form.Select>
                </Form>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Form>
                  <Form.Label>AutoComplete API</Form.Label>
                  <Select
                    options={options}
                    value={apiName}
                    isClearable={true}
                    onChange={(data) => {
                      setApiObj(data);
                      getApiDetails(data);
                      console.log("workflowApiList====>", workflowApiList);
                    }}
                  />
                </Form>
              </Row>
              <Button
                variant="primary"
                onClick={() => createReqFildesArr()}
                style={{ marginTop: 10, marginBottom: 20 }}
                disabled={workflowApiList?.length<=1}
              >
                Sync Payload
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Modal show={show} onHide={closeModal} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>API Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>{renderApiMappingTable()}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCreateWorkflow}>
              Add Workflow
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {workflowApiList.length>1 ? renderApiDetailsTable() : null}


        {/* <div
          className={`shadow p-3 mb-5 bg-body rounded border ${
            addApiBox ? "d-block" : "d-none"
          }`}>
          <div className="mb-3 dropdown">
            <label htmlFor="apiName" className="form-label">
              Api Name
            </label>
            <AutoComplete
              suggestions={apiAllNames}
              autoClass="form-control"
              autoCompleteApi={autoCompleteApi}
              autoCompleteId="apiName"
              inputVal={apiName}
            />
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Add request body"
              value={requestBody}
              id="floatingTextarea2"
              onChange={(e) => setRequestBody(e.target.value)}
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Request Body</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Add request body"
              value={requestBody}
              id="floatingTextarea2"
              onChange={(e) => setRequestBody(e.target.value)}
              style={{ height: "100px" }}
            ></textarea>
            <label htmlFor="floatingTextarea2">Response Body</label>
          </div>
          <div className="mb-3">
            <Button
              variant="contained"
              onClick={addApi}
              disabled={disableAdd()}
              style={{ marginRight: "10px" }}
            >
              {editBox ? "Edit" : "Add"}
            </Button>
            
            <Button
              variant="contained"
              color="error"
              onClick={() => showApiInputBox(false)}
            >
              Cancel
            </Button>
          </div>
        </div>*/}
      </form>

      {apiList && apiList.length > 0 ? (
        <>
          <ShowWorkflow
            apiList={apiList}
            deleteApi={deleteApi}
            editApi={editApi}
          />
          <div className="mb-3">
            <Button
              variant="contained"
              onClick={callApi}
              disabled={disableWorkflow()}
              style={{ marginRight: "10px" }}
            >
              Create Workflow
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setApiList([])}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Workflow;
