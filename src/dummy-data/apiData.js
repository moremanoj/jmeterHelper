export const getEnvironmenList = () => [
  { enviornmentName: "DEV", environmenId: 1 },
  { enviornmentName: "UAT", environmenId: 2 },
  { enviornmentName: "PROD", environmenId: 3 },
];

export const getModuleList = (environmentId) => {
  const moduleList = [
    {
      environmentId: 1,
      moduleList: [
        { moduleName: "MODULE-1", moduleId: 4 },
        { moduleName: "MODULE-2", moduleId: 5 },
        { moduleName: "MODULE-3", moduleId: 6 },
      ],
    },
    {
      environmentId: 2,
      moduleList: [
        { moduleName: "MODULE-1", moduleId: 4 },
        { moduleName: "MODULE-2", moduleId: 5 },
        { moduleName: "MODULE-3", moduleId: 6 },
      ],
    },
    {
      environmentId: 3,
      moduleList: [
        { moduleName: "MODULE-1", moduleId: 4 },
        { moduleName: "MODULE-2", moduleId: 5 },
        { moduleName: "MODULE-3", moduleId: 6 },
      ],
    },
    // { moduleName: "MODULE-1", moduleId: 4, environmenId: 1 },
    // { moduleName: "MODULE-2", moduleId: 5, environmenId: 2 },
    // { moduleName: "MODULE-3", moduleId: 6, environmenId: 3 },
  ];
  return moduleList.find((obj) => {
    console.log(obj);
    return environmentId == obj.environmentId;
  });
};

export const getApiList = (moduleId) => {
  const apiList = [
    {
      moduleId: 4,
      apiList: [
        {
          apiName: "getUser",
          apiId: 7,
          requestField: ["id"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          httpMethod: "GET",
          requestBody: ""
        },
        {
          apiName: "createUser",
          apiId: 8,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          httpMethod: 'POST',
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          requestBody: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8',},
        },
        {
          apiName: "updateUser",
          apiId: 9,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/10",
          httpMethod: 'PUT',
          requestBody: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        },
        {
          apiName: "deleteUser",
          apiId: 10,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/1",
          httpMethod: 'DELETE',
        },
      ],
    },

    {
      moduleId: 5,
      apiList: [
        {
          apiName: "getOrganisation",
          apiId: 7,
          requestField: ["id", "organisationName"],
          responseField: ["id", "organisationName", "organisationAddress"],
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          httpMethod: "GET",
          requestBody: ""
        },
        {
          apiName: "createOrganisation",
          apiId: 8,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          httpMethod: 'POST',
          requestBody: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8',},
        },
        {
          apiName: "updateOrganisation",
          apiId: 9,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/10",
          httpMethod: 'PUT',
          requestBody: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        },
        {
          apiName: "deleteOrganisation",
          apiId: 10,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/1",
          httpMethod: 'DELETE',
        },
      ],
    },

    {
      moduleId: 6,
      apiList: [
        {
          apiName: "getProduct",
          apiId: 7,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          httpMethod: "GET",
          requestBody: ""
        },
        {
          apiName: "createProduct",
          apiId: 8,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts",
          httpMethod: 'POST',
          requestBody: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: { 'Content-type': 'application/json; charset=UTF-8',},
        },
        {
          apiName: "updateProduct",
          apiId: 9,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/10",
          httpMethod: 'PUT',
          requestBody: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
          }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
        },
        {
          apiName: "deleteProduct",
          apiId: 10,
          requestField: ["id", "name"],
          responseField: ["id", "name", "age"],
          apiPath: "https://jsonplaceholder.typicode.com/posts/1",
          httpMethod: 'DELETE',
        },
      ],
    },
  ];
  return apiList.find((obj) => {
    console.log("API LIST===>", obj);
    return moduleId == obj.moduleId;
  });
};
