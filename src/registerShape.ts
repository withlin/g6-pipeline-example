import G6 from '@antv/g6'

const ERROR_COLOR = '#F5222D';
const getNodeConfig = (node: { nodeError: any; type: any; }) => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C',
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF',
  };
  switch (node.type) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#5b8ff9',
      };
      break;
    }
    default:
      break;
  }
  return config;
};

const COLLAPSE_ICON = function COLLAPSE_ICON(x: number, y: any, r: number) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};
const ICON_MAP:any = {
  a: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ',
  b: 'https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ',
}


const Util = G6.Util;
G6.registerNode('pipeline-node', {
    draw(cfg: any, group: any)  {

    // const color = cfg.error ? '#F4664A' : '#30BF78'
    const r = 7;
    // width: 154,
    //       height: 54,
    //       lineWidth: 1,
    //       fontSize: 12,
    //       fill: '#fff',
    //       radius: 24,
    //       stroke: lightColor,
    //       opacity: 1,
    const rect = group.addShape('rect', {
      attrs: {
        fill: 'lightblue',
        stroke: '#888',
        lineWidth: 1,
        radius: 7,
        width: 80,
        height: 35,
        top: true,
        // lineWidth: 1,
        // fontSize: 12,
        // radius: 24,
        // fill:'lightblue',
        // opacity: 1,

      },
    //   name: 'main-box',
      // draggable: true,
    });

    const textConfig = {
      textAlign: 'left',
      textBaseline: 'top',
    };
     group.addShape('dom', {
      attrs: {
        ...textConfig,
        width: 80,
        height: 35,
        x: 12,
        y: 5,
        html: `
        <select class="selectBox">
          <option value="grapefruit">task1</option>
          <option value="lime">task2</option>
          <option value="coconut">task3</option>
          <option value="mango">task4</option> 
        </select>
          `
      },
    });


   

    // group.addShape('text', {
    //   attrs: {
    //     ...textConfig,
    //     x: 42,
    //     y: 20,
    //     text: "task1",
    //     fontSize: 20,
    //     fill: '#000',
    //     cursor: 'pointer',
    //     isTitleShape: true,
    //   },
    // });

    return rect;
  },
  setState(name: any, value: any, item: any) {

    if (name === 'hover' && value) {

      const group = item.getContainer();
      const lightColor = 'lightblue';
      const collapsed = true;
      const rectConfig = {
        width: 80,
        height: 35,
        lineWidth: 1,
        fontSize: 12,
        fill: '#fff',
        radius: 24,
        stroke: lightColor,
        opacity: 1,
      };
      
    group.addShape('circle', {
      name:'test',
      attrs: {
        x: rectConfig.width,
        y: rectConfig.height / 2,
        r: 8,
        stroke: lightColor,
        fill: collapsed ? lightColor : '',
        isCollapseShape: true,
      },
    });

    group.addShape('text', {
      name:'plus',
      attrs: {
        x: rectConfig.width,
        y: rectConfig.height / 2,
        width: 16,
        height: 16,
        textAlign: 'center',
        textBaseline: 'middle',
        text: collapsed ? '+' : '-',
        fontSize: 16,
        fill: collapsed ? '#fff' : lightColor,
        cursor: 'pointer',
        isCollapseShape: true,
      },
    });

    setTimeout(() => {
      const shape = group.get('children');
      group.removeChild(group.get('children')[shape.length -2]);
      group.removeChild(group.get('children')[shape.length -1]);
    },1000);
    

    }


  },
  getAnchorPoints () {
    return [
        [ 0.5, 0.5 ]
    ]
},
},
  'single-node'
);
