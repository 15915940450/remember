var eleContainer=document.querySelector('#container');

// 使用localStorage
var strLiSave=window.localStorage.li || '[]';
var arrLiSave=JSON.parse(strLiSave);

// 類R state
class R extends React.Component{
  constructor(props) {
    super(props);
    // console.log(props);
    this.state={li:arrLiSave};
    /*
    *strNeirong,strXinde,numTimestampHaomiao,bWancheng,bMatchSearch,bSelect
    this.state={li:[
      {strNeirong:"111",strXinde:"看阿森的",numTimestampHaomiao:1495617621946,bWancheng:false,bMatchSearch:true,bSelect:true},
      {strNeirong:"222",strXinde:"看阿阿囧黃吧",numTimestampHaomiao:1495617621947,bWancheng:false,bMatchSearch:false,bSelect:false}
    ]};
    this.state={li:[]};
    */
  }
  rSelectLi(i){
    var arrStateLi=this.state.li;
    //選中反轉(onChange),setState is a function
    arrStateLi[i].bSelect=!arrStateLi[i].bSelect;
    this.setState({li:arrStateLi});
  }
  rSelectSingle(i){
    var arrStateLi=this.state.li;
    //存貯操作之前的選擇狀態
    var bSelectBeforeO=arrStateLi[i].bSelect;
    var numSelect=0;
    for(var j=0;j<arrStateLi.length;j++){
      if(arrStateLi[j].bSelect){
        numSelect++;
      }
      // 全部設為未選中
      arrStateLi[j].bSelect=false;
    }
    // 如果只有一條被選中，則反轉當前點擊，否則始終設置當前為選中
    if(numSelect===1){
      arrStateLi[i].bSelect=!bSelectBeforeO;
    }else{
      arrStateLi[i].bSelect=true;
    }

    // console.log(JSON.stringify(arrStateLi));
    this.setState({li:arrStateLi});
  }
  rEditLi(numLiIndex,strNeirong,strXinde){
    var arrStateLi=this.state.li;

    arrStateLi[numLiIndex].strNeirong=strNeirong;
    arrStateLi[numLiIndex].strXinde=strXinde;

    this.setState({li:arrStateLi});
    //存貯于localStorage
    window.localStorage.li=JSON.stringify(arrStateLi);
  }
  rAddLi(strNeirong){
    //{strNeirong:"222",strXinde:"看阿阿囧黃吧",numTimestampHaomiao:1495617621947,bWancheng:false,bMatchSearch:false,bSelect:false}
    var arrStateLi=this.state.li;

    var objLi={strNeirong:strNeirong,strXinde:"",numTimestampHaomiao:Date.now(),bWancheng:false,bMatchSearch:false,bSelect:false};
    arrStateLi.push(objLi);

    this.setState({li:arrStateLi});
    //存貯于localStorage
    window.localStorage.li=JSON.stringify(arrStateLi);
  }

  //包括 Tab，GlobalOperate，Add，TaskList,Detail
  render(){
    return (
      <section className="capital_r">
        <div className="remember">
          <Tab />
          <GlobalOperate />
          <Add rAddLi={this.rAddLi.bind(this)} />
          <TaskList propLi={this.state.li} rSelectLi={this.rSelectLi.bind(this)} rSelectSingle={this.rSelectSingle.bind(this)} />
        </div>
        <Detail propLi={this.state.li} rEditLi={this.rEditLi.bind(this)} />
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
  displayAddButton(){
    this.eleButton.style.display='';
    this.enableAddButton();
  }
  handleBlur(){
    // console.log('blur');
    this.eleButton.style.display='none';
  }
  enableAddButton(){
    var strEmptyString=this.eleInput.value;
    // console.log(strEmptyString);
    if(strEmptyString.trim()===''){
      this.eleButton.disabled=true;
    }else{
      this.eleButton.disabled=false;
    }
  }
  // onMouseDown先于blur，blur先于click
  addLi(){
    // console.log(ev);
    var strNeirong=this.eleInput.value;
    this.props.rAddLi(strNeirong);
    this.eleInput.value='';
    // window.setTimeout(()=>{
    //   this.eleInput.focus();
    // },300);
  }
  render(){
    return (
      <div className="add">
        <input ref={(a)=>{this.eleInput=a}} type="text" placeholder="添加一個任務" onFocus={this.displayAddButton.bind(this)} onBlur={this.handleBlur.bind(this)} onInput={this.enableAddButton.bind(this)} />
        <button ref={(a)=>{this.eleButton=a}} style={{display:'none'}} type="button" onMouseDown={this.addLi.bind(this)}>add</button>
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
  selectSingle(i){
    return ()=>{
      this.props.rSelectSingle(i);
    }
  }
  //stopPropagation:以防對p的點擊事件selectSingle造成影響
  stop(ev){
    ev.stopPropagation();
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
          <p onClick={this.selectSingle(i).bind(this)}>
            <input checked={v.bSelect} type="checkbox" onClick={this.stop.bind(this)} onChange={this.selectLi(i).bind(this)} />
            <span>{v.strNeirong}</span>
          </p>
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
    // console.log(JSON.stringify(props));
  }
  editLi(numLiIndex){
    return ()=>{
      // 獲取輸入內容,ref={函數}
      var strNeirong=this.eleInput.value;
      var strXinde=this.eleTextarea.value;
      this.props.rEditLi(numLiIndex,strNeirong,strXinde);
    }
  }
  discard(strNeirongBefore,strXindeBefore){
    return ()=>{
      // 手動模擬設置輸入值為原始值來執行函數displayResetButton
      this.eleInput.value=strNeirongBefore;
      this.eleTextarea.value=strXindeBefore;
      // (this.displayResetButton(strNeirongBefore,strXindeBefore))(); 1,2,3,4
      this.eleSubmit.style.display='none';
      this.eleReset.style.display='none';
      this.eleInput.style.backgroundColor='#FFF';
      this.eleTextarea.style.backgroundColor='#FFF';
    }
  }
  displayResetButton(strNeirongBefore,strXindeBefore){
    return ()=>{
      var strNeirong=this.eleInput.value;
      var strXinde=this.eleTextarea.value;
      //當標題與心得都沒發生改變時才不顯示按鈕
      if(strNeirong===strNeirongBefore && strXinde===strXindeBefore){
        this.eleSubmit.style.display='none';
        this.eleReset.style.display='none';
      }else{
        this.eleSubmit.style.display='';
        this.eleReset.style.display='';
      }
      // 標題內容，輸入框
      if(strNeirong!==strNeirongBefore){
        this.eleInput.style.backgroundColor='#FFE7D7';
      }else{
        this.eleInput.style.backgroundColor='#FFF';
      }
      // 心得，文本框
      if(strXinde!==strXindeBefore){
        this.eleTextarea.style.backgroundColor='#FFE7D7';
      }else{
        this.eleTextarea.style.backgroundColor='#FFF';
      }
    }
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
        <div className="detail" key={Math.random()}>
          <p>任務標題：</p>
          <input ref={(a)=>{this.eleInput=a;}} type="text" defaultValue={Rdata[numLiIndex].strNeirong} placeholder="任務" onInput={this.displayResetButton(Rdata[numLiIndex].strNeirong,Rdata[numLiIndex].strXinde).bind(this)} />
          <p>您的心得：</p>
          <textarea ref={(a)=>{this.eleTextarea=a;}} defaultValue={Rdata[numLiIndex].strXinde} placeholder="心得" onInput={this.displayResetButton(Rdata[numLiIndex].strNeirong,Rdata[numLiIndex].strXinde).bind(this)}></textarea>
          <button ref={(a)=>{this.eleSubmit=a;}} style={{display:'none'}} type="button" onClick={this.editLi(numLiIndex).bind(this)}>確定</button>
          <button ref={(a)=>{this.eleReset=a;}} style={{display:'none'}} type="button" onClick={this.discard(Rdata[numLiIndex].strNeirong,Rdata[numLiIndex].strXinde).bind(this)}>取消</button>
        </div>
      );
    }else{
      return null;
    }

  }
}




















ReactDOM.render(<R />,eleContainer);
