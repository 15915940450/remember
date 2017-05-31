var eleContainer=document.querySelector('#container');

// 類R
class R extends React.Component{
  constructor(props) {
    super(props);
    // console.log(props);
    this.state={li:[
      {strNeirong:"111",strXinde:"看阿森的",numTimestampHaomiao:1495617621946,bWancheng:false,bMatchSearch:true,bSelect:true},
      {strNeirong:"222",strXinde:"看阿阿囧黃吧",numTimestampHaomiao:1495617621947,bWancheng:false,bMatchSearch:false,bSelect:false}
    ]};
    // this.state={li:[]};
  }
  rSelectLi(i){
    var arrStateLi=this.state.li;
    //選中反轉(onChange),setState is a function
    arrStateLi[i].bSelect=!arrStateLi[i].bSelect;
    this.setState({li:arrStateLi});
  }
  //包括 Tab，GlobalOperate，Add，TaskList,Detail
  render(){
    return (
      <section className="capital_r">
        <div className="remember">
          <Tab />
          <GlobalOperate />
          <Add />
          <TaskList propLi={this.state.li} rSelectLi={this.rSelectLi.bind(this)} />
        </div>
        <Detail propLi={this.state.li} />
      </section>
    );
  }
}

// 類Tab
class Tab extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
  }
  render(){
    return (
      <div className="tab">
        <a href="javascript:;" className="active">未完成</a>
        <a href="javascript:;">已完成任務</a>
      </div>
    );
  }
}
// 類GlobalOperate
class GlobalOperate extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
  }
  render(){
    return (
      <div className="global_operate">
        <p className="select"><input type="checkbox" name="" value="" /></p>
        <a href="javascript:;" className="complete">標記為已完成</a>
        <a href="javascript:;" className="delete">刪除</a>
      </div>
    );
  }
}
// 類add
class Add extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
  }
  render(){
    return (
      <div className="add">
        <input type="text" placeholder="添加一個任務" name="" value="" />
        <button type="button" disabled="disabled">add</button>
      </div>
    );
  }
}
// 類TaskList
class TaskList extends React.Component{
  constructor(props){
    super(props);
    // console.log('86'+JSON.stringify(props));
  }
  selectLi(i){
    return ()=>{
      this.props.rSelectLi(i);
    }
  }
  render(){
    //arrP 畫筆記本橫線
    var numLine=20;
    var arrP=[];
    for(var i=0;i<numLine;i++){
      arrP.push(<p key={i}></p>);
    }

    // arrLi,此處map()必須用箭頭函數，否則this為undefined
    var Rdata=this.props.propLi;
    var arrLi=Rdata.map((v,i)=>{
      var strActiveOrNot=v.bSelect?'active':'';
      return (
        <li key={v.numTimestampHaomiao} className={strActiveOrNot}>
          <label>
            <input checked={v.bSelect} type="checkbox" onChange={this.selectLi(i).bind(this)} />
            <span>{v.strNeirong}</span>
          </label>
        </li>
      );
    });
    return (
      <div className="task_list">
        <div className="bg_line">
          {arrP}
        </div>
        <ul>
          {arrLi}
        </ul>
      </div>
    );
  };
}
// 類detail
class Detail extends React.Component{
  constructor(props){
    super(props);
    console.log(JSON.stringify(props));
  }
  render(){
    var Rdata=this.props.propLi;
    var numSelect=0;
    var numLiIndex=0;
    for(var i=0;i<Rdata.length;i++){
      if(Rdata[i].bSelect){
        numSelect++;
        numLiIndex=i;
      }
    }
    //當只選中一個，則顯示任務詳情，否則返回null，不顯示
    if(numSelect===1){
      return (
        <div className="detail">
          <input type="text" defaultValue={Rdata[numLiIndex].strNeirong} placeholder="任務" />
          <textarea defaultValue={Rdata[numLiIndex].strXinde} placeholder="心得"></textarea>
          <button type="button">確定</button>
          <button type="button">取消</button>
        </div>
      );
    }else{
      return null;
    }

  }
}




















ReactDOM.render(<R />,eleContainer);
