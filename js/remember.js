var eleRemember=document.querySelector('.remember');

// 類Remember
class Remember extends React.Component{
  constructor(props) {
    super(props);
    console.log(props);
  }
  //包括 Tab，GlobalOperate，Add，TaskList
  render(){
    return (
      <div>
        <Tab />
        <GlobalOperate />
        <Add />
        <TaskList />
      </div>
    );
  }
}

// 類Tab
class Tab extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
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
    console.log(props);
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
    console.log(props);
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
    console.log(props);
  }
  render(){
    return (
      <div className="task_list">
        <div className="bg_line">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <ul>
          <li className="active">
            <label>
              <input type="checkbox" name="" value="" />
              <span>聽說、ka</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="" value="" />
              <span>聽說、ka</span>
            </label>
          </li>
        </ul>
      </div>
    );
  };
}





















ReactDOM.render(<Remember />,eleRemember);
