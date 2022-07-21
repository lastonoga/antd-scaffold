import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  /********************************* display *********************************/
  /***************** http://cssreference.io/property/display *****************/
  ${(props) => (props.isInline ? 'display: inline-flex;' : '')}
  /******************************** direction ********************************/
  /************** http://cssreference.io/property/flex-direction **************/
  ${(props) => (props.isRow ? 'flex-direction: row;' : '')}
  ${(props) => (props.isRowReverse ? 'flex-direction: row-reverse;' : '')}
  ${(props) => (props.isColumn ? 'flex-direction: column;' : '')}
  ${(props) => (props.isColumnReverse ? 'flex-direction: column-reverse;' : '')}
  /*********************************** wrap ***********************************/
  /**************** http://cssreference.io/property/flex-wrap ****************/
  ${(props) => (props.wrap ? `flex-wrap: ${props.wrap};` : '')}
  /***************************** justify-content *****************************/
  /************* http://cssreference.io/property/justify-content *************/
  ${(props) => (props.justify ? `justify-content: ${props.justify};` : '')}
  /****************************** align-content ******************************/
  /************** http://cssreference.io/property/align-content **************/
  ${(props) => (props.alignContent ? `align-content: ${props.alignContent};` : '')}
  /******************************* align-items *******************************/
  /*************** https://cssreference.io/property/flex-shrink/ ***************/
  ${(props) => (props.shrink > -1 ? `flex-shrink: ${props.shrink};` : '')}
  /******************************* align-items *******************************/
  /*************** http://cssreference.io/property/align-items ***************/
  ${(props) => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
  /******************************** utilities ********************************/
  ${(props) => (props.isFullWidth ? 'width: 100%; height: 100%; flex-basis: 100%;' : '')}
  ${(props) => (props.isCentered ? 'align-items: center; justify-content: center;' : '')}
`;
