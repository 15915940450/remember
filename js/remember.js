var eleContainer=document.querySelector('#container');

// 類R
class R extends React.Component{
  constructor(props) {
    super(props);
    // console.log(props);
    this.state={li:[]};
  }
  //包括 Tab，GlobalOperate，Add，TaskList
  render(){
    return (
      <section className="capital_r">
        <div className="remember">
          <Tab />
          <GlobalOperate />
          <Add />
          <TaskList />
        </div>
        <Detail />
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
    // console.log(props);
  }
  render(){
    //arrP 畫筆記本橫線
    var numLine=20;
    var arrP=[];
    for(var i=0;i<numLine;i++){
      arrP.push(<p key={i}></p>);
    }
    return (
      <div className="task_list">
        <div className="bg_line">
          {arrP}
        </div>
        <ul>
          <li>
            <label>
              <input type="checkbox" name="" value="" />
              <span>聽說、ka</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="" value="" />
              <span>聽說、ka2</span>
            </label>
          </li>
        </ul>
      </div>
    );
  };
}
// 類detail
class Detail extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <div className="detail">
        <input type="text" value="" placeholder="任務" />
        <textarea placeholder="心得"></textarea>
        <button type="button">確定</button>
        <button type="button">取消</button>
      </div>
    );
  }
}




















ReactDOM.render(<R />,eleContainer);
