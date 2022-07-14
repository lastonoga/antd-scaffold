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


import { Component as C } from './generator/tree'
import { SimpleState } from './generator/states'
import { SimpleAPIConnector } from './generator/apis'

export function Generate() {
  let dynamicTest = new SimpleState('dynamicTest', 'test1');
  let staticTest = new SimpleState('staticTest', 'test3');

  let tableData = new SimpleAPIConnector('tableData', router('/abc'), [dynamicTest])


  let layout = `
  <SiteLayout>
    <Row gutter={[16, 24]}>
      <Col>
        <Space>
          <Select defaultValue={SimpleState(dynamicTest)} onChange={dynamicTest} options={options} />
        </Space>
      </Col>
      <Col>
        <Table
          dataSource={tableData.response}
          loading={tableData.loading}
          />
      </Col>
    </Row>
  </SiteLayout>`;
}


export default {
  states: {
    staticTest: 'test',
    dynamicTest: 'test3',
  },
  apis: {
    tableData: {
      states: ['dynamicTest'],
      fetch(ctx) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([{
              key: '1',
              name: ctx.dynamicTest[0],
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
                          value: (ctx) => ctx.dynamicTest[0]
                        },
                        onChange: {
                          states: ['dynamicTest'],
                          value: (ctx) => (value) => ctx.dynamicTest[1](value),
                        },
                        options,
                      },
                    }, {
                      component: "Select",
                      options: {
                        defaultValue: 'test3',
                        disabled: {
                          states: ['dynamicTest'],
                          value: (ctx) => ctx.dynamicTest[0] === 'test1'
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
                  value: (ctx) => ctx.staticTest[0]
                }, 
                " - ",
                {
                  states: ['dynamicTest'],
                  value: (ctx) => ctx.dynamicTest[0]
                }, {
                  component: 'Input',
                  options: {
                    defaultValue: {
                      states: ['dynamicTest'],
                      value: (ctx) => ctx.dynamicTest[0]
                    },
                    onChange: {
                      states: ['dynamicTest'],
                      value: (ctx) => (value) => ctx.dynamicTest[1](value.target.value),
                    },
                  },
                }, {
                  component: 'Button',
                  apis: {
                    tableData: {
                      manual: true,
                    }
                  },
                  options: {
                    onClick: {
                      states: [],
                      value: (ctx) => (value) => ctx.apis.tableData(),
                    },
                  },
                  children: ['Refresh']
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
                    manual: false,
                  }
                },
                options: {
                  columns,
                  dataSource: {
                    states: ['tableData'],
                    value: (ctx) => {
                      return ctx.tableData[0].response
                    }
                  },
                  loading: {
                    states: ['tableData'],
                    value: (ctx) => ctx.tableData[0].loading
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
