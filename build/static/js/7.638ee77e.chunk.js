(this["webpackJsonpstudent-scheduler"]=this["webpackJsonpstudent-scheduler"]||[]).push([[7],{354:function(e,t,a){"use strict";a.r(t);var n=a(149),c=a(165),r=a(164),u=a(0),l=a.n(u),i=(a(91),a(9)),o=a(163),s=a(352),d=a(318),m=a(350),p=a(150),h=a.n(p),f=a(192),g=a(351),b=a(353),E=f.a.Option,y=function(e){var t=e.changeInput,a=e.defultType,n=e.searchList;return l.a.createElement(g.a,{layout:"inline"},l.a.createElement(g.a.Item,null,l.a.createElement(f.a,{defaultValue:a,onChange:function(e){return t({target:{name:"searchType",value:e}})}},l.a.createElement(E,{value:"firstName"},"First Name"),l.a.createElement(E,{value:"lastName"},"Last Name"))),l.a.createElement(g.a.Item,null,l.a.createElement(b.a,{type:"text",placeholder:"Enter Name",name:"searchValue",onChange:t})),l.a.createElement(o.a,{onClick:n}," Search "))},j=[{title:"Name",render:function(e){return l.a.createElement("div",null,e.firstName+" "+e.lastName)},key:"name",fixed:"left"},{title:"Period",dataIndex:"period",key:"period"},{title:"Subjects",key:"subjects",render:function(e){return l.a.createElement("div",null,e.subjects.map((function(e){return l.a.createElement("span",null,e,", ")})))}},{title:"Grades",key:"grades",render:function(e){return l.a.createElement("div",null,e.grades.map((function(e){return l.a.createElement("span",null,e,", ")})))}},{title:"Student Count",dataIndex:"studentCount",key:"studentCount"},{title:"Action",key:"operation",fixed:"right",render:function(e){return l.a.createElement(o.a,null,"Edit")}}];t.default=function(){var e=Object(i.g)(),t=Object(u.useState)(),a=Object(r.a)(t,2),p=a[0],f=a[1],g=Object(u.useState)({totalCount:0,pageIndex:0,pageSize:30}),b=Object(r.a)(g,2),E=b[0],O=b[1],S=Object(u.useState)({searchValue:"",searchType:"firstName"}),N=Object(r.a)(S,2),v=N[0],C=N[1];Object(u.useEffect)((function(){w()}),[E.pageIndex]);var w=function(){var e,t,a;""===v.searchValue?(t=E.pageIndex,a=E.pageSize,h.a.get("".concat("http://tower.watu.fi:8080","/teachers?page=").concat(t,"&size=").concat(a)).then((function(e){return e.data}))).then((function(e){f(e._embedded.teachers),O(Object(c.a)(Object(c.a)({},E),{},{totalCount:e.page.totalElements}))})):"firstName"===v.searchType?(e=v.searchValue,h.a.get("".concat("http://tower.watu.fi:8080","/teachers/search/findByFirstName?name=").concat(e)).then((function(e){return console.log("env : ","http://tower.watu.fi:8080"),e.data}))).then((function(e){f(e._embedded.teachers),O({totalCount:1,pageIndex:0,pageSize:30})})):"lastName"===v.searchType&&function(e){return h.a.get("".concat("http://tower.watu.fi:8080","/teachers/search/findByLastName?name=").concat(e)).then((function(e){return e.data}))}(v.searchValue).then((function(e){f(e._embedded.teachers),O({totalCount:1,pageIndex:0,pageSize:30})}))};return l.a.createElement(s.a,{ghost:!1,title:"Teacher List View",extra:[l.a.createElement(o.a,{key:"1",type:"primary"},"Genrate Calender"),l.a.createElement(o.a,{key:"2",type:"primary"},"Launch Schedule")]},l.a.createElement(y,{changeInput:function(e){var t=e.target,a=t.name,r=t.value;C(Object(c.a)(Object(c.a)({},v),{},Object(n.a)({},a,r)))},searchList:function(){w()},defultType:v.searchType}),p?l.a.createElement(m.a,{className:"table-padding",columns:j,dataSource:p,onChange:function(e,t,a){O(Object(c.a)(Object(c.a)({},E),{},{pageIndex:e.current,pageSize:e.pageSize}))},pagination:{total:E.totalCount,pageSize:E.pageSize,showTotal:function(e,t){return"".concat(t[0],"-").concat(t[1]," out of ").concat(e)}},onRow:function(t){return{onClick:function(){return e.push("/studentlist/teacher/".concat(t.id))}}}}):l.a.createElement(d.a,{className:"loading-table"}))}}}]);
//# sourceMappingURL=7.638ee77e.chunk.js.map