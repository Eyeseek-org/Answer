import React, {useState} from 'react';
import Tree from 'react-d3-tree';
import styled, {useTheme} from 'styled-components';
import Circle from '../../components/animated/Circle';
import List from './List';
import { motion } from 'framer-motion';
import { ExpandIcon } from '../../components/icons/Notifications';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5%;
  gap: 5%;
  animation: fadeIn 0.7s;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const TreeWrapper = styled(motion.div)`
  display: flex;
  position: relative;
  justify-content: center;
  width: ${(props) => (props.expand ? '100vw' : '40vw')};
  height: 100vh;
  border: 1px solid #af7ac5;
  border-radius: 10px;
  background:  #272727;
  transition: width 0.5s ease-in-out;
  @media (max-width: 1168px) {
    width: 100vw;
  }
`
const Text = styled.div`
  color: ${(props) => props.theme.colors.primary}; 
  font-family: 'Gemunu Libre';
  letter-spacing: 1px;
  font-size: 1.2rem;
`

const Expand = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  &:hover{
    opacity: 0.9;
  }
`

const orgChart = {
  name: 'CEO',
  children: [
    {
      name: 'Solidity',
      attributes: {
        value: 'Solidity',
      },
      children: [
        {
          name: 'Token',
          attributes: {
            value: 'Token',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Tooling',
          attributes: {
            value: 'Tooling',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'DeFi',
          attributes: {
            value: 'DeFi',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Token',
          attributes: {
            value: 'Token',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'Tooling',
          attributes: {
            value: 'Tooling',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
        {
          name: 'DeFi',
          attributes: {
            value: 'DeFi',
          },
          children: [
            {
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};


export const D3Tree = (): JSX.Element => {
  const [collection, setCollection] = useState('');
  const [expand, setExpand] = useState(false);
  const theme = useTheme()

  const switchExpand = () => {
    setExpand(!expand);
  }

  const fetchDetails = (item: String) => {
    console.log('fetching details')
  }

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }: any) => {
    const handleCircle = (item: String) => {
      setCollection(item)
      toggleNode()
      fetchDetails(item);
      // Return filtered results, collection as a parameter
      // /DB/${collection}/
    }
    return (
      <g>
        <Circle 
          onClick={()=>{handleCircle(nodeDatum?.attributes?.value)}} 
          color={theme.colors.cardGradient}
          stroke={theme.colors.lightGray}
          value={nodeDatum?.attributes?.value} 
          active={collection}>
        </Circle>
        <foreignObject {...foreignObjectProps}>
          <Text>
            <h3 style={{ textAlign: 'center' }}>
              {nodeDatum?.attributes?.value}
            </h3>
          </Text>
        </foreignObject>
      </g>
    );
  };

  const renderCustom = (rd3tProps: any) => {
    return renderForeignObjectNode({ ...rd3tProps, foreignObjectProps });
  };

  const foreignObjectProps = {
    width: 200,
    height: 100,
    y: 30,
    x: -100,
  };

  return (
    <Container>
      <TreeWrapper id="treeWrapper" expand={expand} >
        <Expand onClick={switchExpand}><ExpandIcon width={20} color={theme.colors.primary}/> </Expand>
        <Tree
          transitionDuration={400}
          translate={{ x: 200, y: 150 }}
          renderCustomNodeElement={renderCustom}
          data={orgChart}
          initialDepth={1}
          pathFunc={'step'}
          orientation={'vertical'}
        ></Tree>
      </TreeWrapper>
      <List collection={collection} />

    </Container>
  );
};