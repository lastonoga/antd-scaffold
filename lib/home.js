const options = [{
  label: 'test1',
  value: 'test1',
}, {
  label: 'test2',
  value: 'test2',
}, {
  label: 'test3',
  value: 'test3',
}]

const dataSource = {
  states: ['dynamicTest'],
  value: (s) => ([
    {
      key: '1',
      name: s.dynamicTest[0],
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ])
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];




export default {
  states: {
    staticTest: 'test',
    dynamicTest: 'test3',
  },
  apis: {
    tableData: {
      states: ['dynamicTest'],
      fetch(states) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([{
              key: '1',
              name: states.dynamicTest[0],
              age: 32,
              address: '10 Downing Street',
            },
            {
              key: '2',
              name: 'John',
              age: 42,
              address: '10 Downing Street',
            }])
          }, 1500)
        })
      }
    }
  },
  tree: [
    {
      component: 'SiteLayout',
      children: [
        {
          component: "Row",
          options: {
            gutter: [16, 24]
          },
          children: [
            {
              component: "Col",
              options: {
                span: '5',
              },
              children: [
                {
                  component: "Space",
                  children: [
                    {
                      component: "Select",
                      options: {
                        defaultValue: {
                          states: ['dynamicTest'],
                          value: (s) => s.dynamicTest[0]
                        },
                        onChange: {
                          type: 'fn',
                          states: ['dynamicTest'],
                          value: (s) => (value) => s.dynamicTest[1](value),
                        },
                        options,
                      },
                    }, {
                      component: "Select",
                      options: {
                        defaultValue: 'test3',
                        disabled: {
                          states: ['dynamicTest'],
                          value: (s) => s.dynamicTest[0] === 'test1'
                        },
                        options,
                      },
                    }
                  ]
                }
              ]
            }, {
              component: "Col",
              options: {
                span: '4',
              },
              children: [
                {
                  states: ['staticTest'],
                  value: (s) => s.staticTest[0]
                }, 
                " - ",
                {
                  states: ['dynamicTest'],
                  value: (s) => s.dynamicTest[0]
                }, {
                  component: 'Input',
                  options: {
                    defaultValue: {
                      states: ['dynamicTest'],
                      value: (s) => s.dynamicTest[0]
                    },
                    onChange: {
                      states: ['dynamicTest'],
                      value: (s) => (value) => s.dynamicTest[1](value.target.value),
                    },
                  },
                }
              ]
            }, {
              component: "Col",
              options: {
                span: '24',
              },
              children: [{
                component: "Table",
                apis: {
                  tableData: {
                    states: ['dynamicTest'],
                  }
                },
                options: {
                  columns,
                  dataSource: {
                    states: ['tableData'],
                    value: (s) => s.tableData[0].response
                  },
                  loading: {
                    states: ['tableData'],
                    value: (s) => s.tableData[0].loading
                  },
                }
              }]
            }
          ]
        }
      ]
    }
  ]
}
