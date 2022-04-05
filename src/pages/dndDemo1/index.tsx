import React, { FC, Component } from "react";
import ReactDOM from 'react-dom'
import { sortableContainer, sortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { startFish_mock } from '../../mock/index.ts'
import {Form, Input} from 'antd'

const SortableContainer = sortableContainer(({ children }) => {
  return <div> { children } </div>;
});
const FormItemHandle = SortableHandle(()=><div>这里拖拽</div>) 
const TestHandle = SortableHandle(({children})=><div>{children}</div>) 
const SortableItem = sortableElement(({ onSortEnd, value,children }) => (<div 
  style={{
    marginBottom:'20px', 
    border: '1px solid #000',
    padding: 20
  }}>{value}
    <SortableContainer
      collection={value}
      key={value}
      onSortEnd={onSortEnd}
      useDragHandle
    ><Form>{ children }</Form></SortableContainer></div>
  ));

const SortableFormItem = sortableElement(({ formKey }) => {
  return <>
    {/* <FormItemHandle/> */}
    <TestHandle key={formKey}>
      {formKey}
    </TestHandle>
    <Form.Item label={formKey} name={formKey}>
      <Input/>
    </Form.Item>    
  </>
});

const App = () => {
  const onSortEnd = ({ oldIndex, newIndex, collection }) => {
    console.log('oldIndex, newIndex===>', oldIndex, newIndex, collection)
  };
  return <div style={{margin: '20px 0 0 20px', padding: '20px 0 20px 20px'}}>
    <SortableContainer onSortEnd={onSortEnd} collection={'listWrapper'} key={'listWrapper'}>
        {startFish_mock.map((item, index) => (
          <SortableItem 
            key={item.blockId} 
            index={index} 
            value={item.blockId} 
            onSortEnd={onSortEnd}
            collection={'listWrapper'}
          >
            {item.appInfo.templatePages.map(
              (subItem, subIndex)=>
                <SortableFormItem 
                  key={`item-${subItem.name}`} 
                  index={subIndex} 
                  formKey={subItem.name}
                  value={subItem.name}
                  collection={item.blockId}
                />
              )
            }
          </SortableItem>
        ))}
      </SortableContainer>
  </div>
}
export default App;