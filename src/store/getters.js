export default {
  krpanoList: state => state.krpano.krpanoList,
  worksData: state => state.krpano.wordsData,
  editKrpano: state => state.krpano.editKrpano,
  prevKrpano: state => state.krpano.prevKrpano,
  
  hostList: state => {
    let list = state.krpano.wordsData.krpanoList;
    let activeId = state.krpano.editKrpano;
    let index = list.findIndex(item => item.id === activeId);
    return list[index].hostList;
  },
  krpanoDetail: state => {
    let list = state.krpano.wordsData.krpanoList;
    let activeId = state.krpano.editKrpano;
    return list.find(item => item.id === activeId);
  },
  previewDetail: state => {
    let list = state.krpano.wordsData.krpanoList;
    let activeId = state.krpano.prevKrpano;
    return list.find(item => item.id === activeId);
  }
};
