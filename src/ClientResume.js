import React from 'react';
import PrintTemplate from 'react-print';
import {Button, Nav, NavItem, Navbar, Glyphicon, Modal, HelpBlock} from 'react-bootstrap';

export class SidebarNav extends React.Component {
	render() {
		return(
			<div id="react-no-print">
				<div id="sidebar-menu" style={{marginTop:"72px",position:"fixed",width: "16%"}}>
					<Navbar fluid inverse style={{"borderTopRightRadius": "25px","borderBottomLeftRadius": "25px"}}>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="" onClick={e => {e.preventDefault();}} style={{"color":"#fff"}}>Quick Link</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse bsstyle="padding-left: 0px;">
							<Nav>
								<NavItem eventKey={1} href="#personal_info"><span style={{"color":"#fff"}}>Personal Info</span></NavItem>
								<NavItem eventKey={2} href="#qualification"><span style={{"color":"#fff"}}>Qualification</span></NavItem>
								<NavItem eventKey={3} href="#work_experience"><span style={{"color":"#fff"}}>Work Experience</span></NavItem>
								<NavItem eventKey={4} href="#project_detail"><span style={{"color":"#fff"}}>Project Details</span></NavItem>
								<NavItem eventKey={5} href="#technical_skill"><span style={{"color":"#fff"}}>Technical Skill</span></NavItem>
								<NavItem eventKey={6} href="#achievement"><span style={{"color":"#fff"}}>Achivements</span></NavItem>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</div>
			</div>				
		);
	}
}

export default class ClientResume extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleSavePersonal = this.handleSavePersonal.bind(this);

		this.state = {
			activeKey: '0',
			isVisible: false,
			show:false,
			showqual:false,
			showexp:false,
			showproject:false,
			showskill:false,
			showachivement:false,
			scrollingLock: false,
			myObj:[{
				personal_info:{"name":"Ravi Prakash Kesarwani","email":"ravibca199600@gmail.com","phone":"+91-8543819032","dob":"14/10/1996","location":"Allahabad","gender":"Male"},
				qualification:[{"education":"BCA","institue_name":"M.G.K.V.P","year_of_passing":"2017"},{"education":"MCA","institue_name":"Integral University","year_of_passing":"2018"}],
				experience:[{"organization":"uCertify","designation":"Apps Developer","exp_from":"January 2017","exp_to":"Present","exp_department":"Apps Developer"},{"organization":"testing","designation":"TCS","exp_from":"January 2018","exp_to":"Present","exp_department":"Test"}],
				project:[{"project_title":"uCertify","project_description":"Apps Developer","project_from":"January 2017","project_to":"Present","project_role":"Apps Developer","project_team":"Apps Developer"},{"project_title":"uCertify","project_description":"Apps Developer","project_from":"January 2017","project_to":"Present","project_role":"Apps Developer","project_team":"Apps Developer"}],
				skill:[{"skill_name":"React.js","exp_year":"1","exp_month":"0"},{"skill_name":"PHP","exp_year":"1","exp_month":"4"}],
				achivement:[{"achivement_name":"Testing"},{"achivement_name":"Test"}]
			}],
			yop_arr : [
				"2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002"
			]
		};
  	}

	handleSelect(activeKey) {
		this.setState({ activeKey });
	}  

	updateModal(isVisible) {
		this.setState({
			isVisible:isVisible
		});
	}

	setSaveState(obj, show) {
		this.setState({
			myObj:obj,
			[show]:false
		});
	}
	handleAllValidation(id_array) {
		for (let i = 0; i < id_array.length; i++) {
			if (!document.getElementById(id_array[i]).value) {
				document.getElementById(id_array[i]).focus();
				return false;
			}
		}
		return true;
	}
	handleSavePersonal(e) {
		e.preventDefault();
		if (this.handleAllValidation(["user_name","user_email","user_phone","user_dob","user_location","user_gender"])) {
			let objcopy = this.state.myObj;
			objcopy[0]['personal_info']['name']  = document.getElementById("user_name").value;
			objcopy[0]['personal_info']['email'] = document.getElementById("user_email").value;
			objcopy[0]['personal_info']['phone'] = document.getElementById("user_phone").value;
			objcopy[0]['personal_info']['dob']   = document.getElementById("user_dob").value;
			objcopy[0]['personal_info']['location'] = document.getElementById("user_location").value;
			objcopy[0]['personal_info']['gender']   = document.getElementById("user_gender").value;	
			this.setSaveState(objcopy, "show");
		}
	}
  
	handleSaveQual(e) {
		e.preventDefault();
		let objcopy = this.state.myObj;
		if (this.curIndex != null) {
			if (this.handleAllValidation(["qualification_course","qualification_institute","qualification_yop"])) {
				objcopy[0]['qualification'][this.curIndex]['education'] = document.getElementById("qualification_course").value;
				objcopy[0]['qualification'][this.curIndex]['institue_name'] = document.getElementById("qualification_institute").value;
				objcopy[0]['qualification'][this.curIndex]['year_of_passing'] = document.getElementById("qualification_yop").value;
				this.setSaveState(objcopy, "showqual");
			}
		} else {
			if (this.handleAllValidation(["qualification_course","qualification_institute","qualification_yop"])) {
				objcopy[0]['qualification'].push({
					"education":document.getElementById("qualification_course").value,
					"institue_name":document.getElementById("qualification_institute").value,
					"year_of_passing":document.getElementById("qualification_yop").value
				});
				this.setSaveState(objcopy, "showqual");
			}
		}
	}
  
	handleSaveExp(e) {
			e.preventDefault();
			let objcopy = this.state.myObj;
			if (this.curExp != null) {
				objcopy[0]['experience'][this.curExp]['organization'] = document.getElementById("exp_organization").value;
				objcopy[0]['experience'][this.curExp]['designation'] = document.getElementById("exp_designation").value;
				objcopy[0]['experience'][this.curExp]['exp_from'] = document.getElementById("exp_from").value;
				objcopy[0]['experience'][this.curExp]['exp_to'] = document.getElementById("exp_to").value;
				objcopy[0]['experience'][this.curExp]['exp_department'] = document.getElementById("exp_department").value;
				this.setSaveState(objcopy, "showexp");
			} else {
				objcopy[0]['experience'].push({
					"organization":document.getElementById("exp_organization").value,
					"designation":document.getElementById("exp_designation").value,
					"exp_from":document.getElementById("exp_from").value,
					"exp_to":document.getElementById("exp_to").value,
					"exp_department":document.getElementById("exp_department").value
				});
				this.setSaveState(objcopy, "showexp");
		}
	}
  
  	handleSaveProject(e) {
		e.preventDefault();
		let objcopy = this.state.myObj;
		if (this.curProject != null) {
			objcopy[0]['project'][this.curProject]['project_title'] = document.getElementById("project_title").value;
			objcopy[0]['project'][this.curProject]['project_description'] = document.getElementById("project_description").value;
			objcopy[0]['project'][this.curProject]['project_from'] = document.getElementById("project_from").value;
			objcopy[0]['project'][this.curProject]['project_to'] = document.getElementById("project_to").value;
			objcopy[0]['project'][this.curProject]['project_role'] = document.getElementById("project_role").value;
			objcopy[0]['project'][this.curProject]['project_team'] = document.getElementById("project_team").value;
			this.setSaveState(objcopy, "showproject");
		} else {
			objcopy[0]['project'].push({
				"project_title":document.getElementById("project_title").value,
				"project_description":document.getElementById("project_description").value,
				"project_from":document.getElementById("project_from").value,
				"project_to":document.getElementById("project_to").value,
				"project_role":document.getElementById("project_role").value,
				"project_team":document.getElementById("project_team").value
			});
			this.setSaveState(objcopy, "showproject");
		}
	}

	handleSaveSkill(e) {
		e.preventDefault();
		let objcopy = this.state.myObj;
		if (this.curSkill != null) {
			objcopy[0]['skill'][this.curSkill]['skill_name'] = document.getElementById("skill_name").value;
			objcopy[0]['skill'][this.curSkill]['exp_year'] = document.getElementById("exp_year").value;
			objcopy[0]['skill'][this.curSkill]['exp_month'] = document.getElementById("exp_month").value;
			this.setSaveState(objcopy, "showskill");
		} else {
			objcopy[0]['skill'].push({
				"skill_name":document.getElementById("skill_name").value,
				"exp_year":document.getElementById("exp_year").value,
				"exp_month":document.getElementById("exp_month").value
			});
			this.setSaveState(objcopy, "showskill");
		}
	}

	handleSaveAchivement(e) {
		e.preventDefault();
		let objcopy = this.state.myObj;
		if (this.curAchivement != null) {
			if (this.handleAllValidation(["achivement_name"])) {
				objcopy[0]['achivement'][this.curAchivement]['achivement_name'] = document.getElementById("achivement_name").value;
				this.setSaveState(objcopy, "showachivement");
			}
		} else {
			if (this.handleAllValidation(["achivement_name"])) {
				objcopy[0]['achivement'].push({
					"achivement_name":document.getElementById("achivement_name").value
				});
				this.setSaveState(objcopy, "showachivement");
			}
		}
	}		
	
	handleModalClose(state_name,e) {
		this.setState({ 
			[state_name]: false 
		});
	}
	
	handleModalEdit(state_name) {
		this.setState({ 
			[state_name]: true 
		});
	}
	
	handleShow() {
		this.handleModalEdit("show");
	}
  
	handleQualClick(index,e) {
		this.curIndex = index;
		this.handleModalEdit("showqual");
	}
  
	handleExpClick(index,e) {
		this.curExp = index;
		this.handleModalEdit("showexp");  
	}
  
  handleProjectClick(index,e) {
	this.curProject = index;	
	this.handleModalEdit("showproject"); 
  }
  
  handleSkillClick(index,e) {
	this.curSkill = index;
	this.handleModalEdit("showskill"); 
  }
  
  handleAchivementClick(index,e) {
	this.curAchivement = index;
	this.handleModalEdit("showachivement"); 
  }
  
  handleModaldelete (of_which, index) {
	let objcopy = this.state.myObj;
	objcopy[0][of_which] = objcopy[0][of_which].filter(function(person, ind) { 
		return ind !== index;
	})
	this.setState({
		myObj : objcopy
	});	
  }
	
  handleQualDelete(index, e) {	
	this.curIndex = null;
	this.handleModaldelete("qualification",index);
  }
  
  handleExpDelete(index, e) {
	this.curExp = null;
	this.handleModaldelete("experience",index);
  }
  
  handleProjectDelete(index, e) {
	this.curProject = null;
	this.handleModaldelete("project",index);
  }
  
  handleSkillDelete(index, e) {
	this.curSkill = null;
	this.handleModaldelete("skill", index);
  }
  
  handleAchivementDelete(index, e) {
	  this.curAchivement = null;
	  this.handleModaldelete("achivement",index);
  }
  
  addQualification (e) {
	this.curIndex = null;
	this.setState({
		showqual:true
	});
  }
  
  addExperience (e) {
	this.curExp = null;
	this.setState({
		showexp:true
	});
  }
  
  addProject (e) {
	this.curProject = null;
	this.setState({
		showproject:true
	});
  }
  
  addSkill (e) {
	this.curSkill = null;
	this.setState({
		showskill:true
	});
  }

  addAchivement (e) {
	this.curAchivement = null;
	this.setState({
		showachivement:true
	});
  }
  
  handlePrint() {
	window.print();
  }

  render() {
		const renderQualificationList = () => {
			return this.state.myObj[0]['qualification'].map((number,index) => {
				return (
					<div key={"qualification_container_"+(index+1)}>
						<div>
							<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
								<li key={"qualification_key_"+(index+1)}>
									<div style={{"width": "25%","display": "inline-block"}}>
										<b>Course Name:</b>
									</div>
									<b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['education']}</b>
									<div className="pull-right">
										<div id="react-no-print" className="pull-right">
											<Glyphicon glyph="glyphicon glyphicon-pencil" style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}} id={"qualification_edit_"+(index+1)} name={"qualification_edit"+(index+1)} onClick={this.handleQualClick.bind(this,index)}/>
											<Glyphicon glyph="glyphicon glyphicon-trash" style={{"fontSize" : "15px","cursor":"Pointer","color":"#B0281A"}} name={"qualification_delete_"+(index+1)} id={"qualification_delete_"+(index+1)} onClick={this.handleQualDelete.bind(this,index)}/>
										</div>
									</div>
								</li>
								<li key={"institue_key_"+(index+1)}>
									<div style={{"width": "25%","display": "inline-block"}}><b>Institue Name:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['institue_name']}</b>
								</li>
								<li key={"yop_key_"+(index+1)}>
									<div style={{"width": "25%","display": "inline-block"}}><b>Year of Passing:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['year_of_passing']}</b>
								</li>
							</ul>
						</div>
					</div>
				);	
			});
	 };
	 
	 const renderExperienceList = () => {
		return this.state.myObj[0]['experience'].map((number,index) => {
			return (
				<div key={"exp_container_"+(index+1)}>
					<div>
						<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
							<li key={"organization_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Organization:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['organization']}</b>
								<div id="react-no-print" className="pull-right">
									<div className="pull-right">
										<Glyphicon glyph="glyphicon glyphicon-pencil" style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}} id={"exp_edit"+(index+1)} name={"exp_edit"+(index+1)} onClick={this.handleExpClick.bind(this,index)}/>
										<Glyphicon glyph="glyphicon glyphicon-trash" style={{"fontSize" : "15px","cursor":"Pointer","color":"#B0281A"}} name={"exp_delete_"+(index+1)} id={"exp_delete_"+(index+1)} onClick={this.handleExpDelete.bind(this,index)}/>
									</div>
								</div>
							</li>
							<li key={"designation_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Designation:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['designation']}</b>
							</li>
							<li key={"from_date_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>From Date:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['exp_from']}</b>
							</li>
							<li key={"to_date_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>To:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['exp_to']}</b>
							</li>
							<li key={"department_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Department:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['exp_department']}</b>
							</li>
						</ul>
					</div>
				</div>
			);	
		});
	 };
	 
	 const renderProjectList = () => {
		return this.state.myObj[0]['project'].map((number, index) => {
			return (
				<div key={"project_container_"+(index+1)}>
					<div>
						<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
							<li key={"project_title_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Project Title:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_title']}</b>
								<div id="react-no-print" className="pull-right">
									<div className="pull-right">
										<Glyphicon glyph="glyphicon glyphicon-pencil" style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}} id={"project_edit"+(index+1)} name={"Project_edit"+(index+1)} onClick={this.handleProjectClick.bind(this,index)}/>
										<Glyphicon glyph="glyphicon glyphicon-trash" style={{"fontSize" : "15px","cursor":"Pointer","color":"#B0281A"}} name={"project_delete_"+(index+1)} id={"project_delete_"+(index+1)} onClick={this.handleProjectDelete.bind(this,index)}/>
									</div>
								</div>
							</li>
							<li key={"project_description_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Description:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_description']}</b>
							</li>
							<li key={"project_f_date_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>From Date:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_from']}</b>
							</li>
							<li key={"project_to_date_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>To:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_to']}</b>
							</li>
							<li key={"project_role_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Role:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_role']}</b>
							</li>
							<li key={"project_team_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Team Size:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['project_team']}</b>
							</li>
						</ul>
					</div>
				</div>
			);	
		});
	 };
	 
	 const renderSkillList = () => {
		return this.state.myObj[0]['skill'].map((number,index) => {
			return (
				<div key={"skill_container_"+(index+1)}>
					<div>
						<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
							<li key={"skill_name_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Skill Name:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['skill_name']}</b>
								<div id="react-no-print" className="pull-right">
									<div className="pull-right">
										<Glyphicon glyph="glyphicon glyphicon-pencil" style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}} id={"skill_edit"+(index+1)} name={"skill_edit"+(index+1)} onClick={this.handleSkillClick.bind(this,index)}/>
										<Glyphicon glyph="glyphicon glyphicon-trash" style={{"fontSize" : "15px","cursor":"Pointer","color":"#B0281A"}} name={"skill_delete_"+(index+1)} id={"skill_delete_"+(index+1)} onClick={this.handleSkillDelete.bind(this,index)}/>
									</div>
								</div>
							</li>
							<li key={"exp_year_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Experience Year:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['exp_year']}</b>
							</li>
							<li key={"exp_month_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>Experience Month:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['exp_month']}</b>
							</li>
						</ul>
					</div>
				</div>
			);	
		});
	 };
	 
	 const renderAchivementList = () => {
		return this.state.myObj[0]['achivement'].map((number,index) => {
			return (
				<div key={"achievement_container_"+(index+1)}>
					<div>
						<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
							<li key={"achievement_name_key_"+(index+1)}>
								<div style={{"width": "25%","display": "inline-block"}}><b>{"Achivement"+ (index+1)}:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{number['achivement_name']}</b>
								<div id="react-no-print" className="pull-right">
									<div className="pull-right">
										<Glyphicon glyph="glyphicon glyphicon-pencil" style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}} id={"achivement_edit"+(index+1)} name={"achivement_edit"+(index+1)} onClick={this.handleAchivementClick.bind(this,index)}/>
										<Glyphicon glyph="glyphicon glyphicon-trash" style={{"fontSize" : "15px","cursor":"Pointer","color":"#B0281A"}} name={"achivement_delete_"+(index+1)} id={"achivement_delete_"+(index+1)} onClick={this.handleAchivementDelete.bind(this,index)}/>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			);	
		});
	 };
  return (
		<div className="container">
			<SidebarNav />
			<div style={{position:"relative",left:"25.3%",width:"68%"}}>
				<div>
					<h3 className="text-center page-header">Client Resume<div id="react-no-print" className="pull-right"><span className="glyphicon glyphicon-print pull-right" style={{"fontSize":'20px',"cursor":"pointer"}} onClick={this.handlePrint.bind(this)}></span></div></h3>
				</div>
					<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}} id="personal_info" name="personal_info">
						<h3 style={{"color":"#375076","fontSize":"20px"}}><span className="glyphicon glyphicon-user" style={{"fontSize":'20px'}}></span>   Personal Info</h3>							
							<ul className="list-unstyled" style={{"marginBottom": "12px"}}>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>Name:</b></div><b style={{"display":'inline-block',"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['name']}</b>
									<div id="react-no-print" className="pull-right">
										<Glyphicon glyph="glyphicon glyphicon-pencil pull-right" onClick={this.handleShow} style={{"fontSize" : "15px","marginRight": "5px","cursor":"Pointer","color": "#0aa","fontWeight": "800"}}/>
									</div>
								</li>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>E-mail:</b></div><b style={{"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['email']}</b>
								</li>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>Contact:</b></div><b style={{"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['phone']}</b>
								</li>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>Date of Birth:</b></div><b style={{"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['dob']}</b>
								</li>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>Location:</b></div><b style={{"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['location']}</b>
								</li>
								<li>
									<div style={{"width": "25%","display": "inline-block"}}><b>Gender:</b></div><b style={{"color":  "#555","fontFamily": "monospace"}}>{this.state.myObj[0]['personal_info']['gender']}</b>
								</li>
							</ul>
						</div>
						<form className = "form-horizontal" name = "personal_form" id = "personal_form" method = "post" action="#">
							<Modal show={this.state.show} onHide={this.handleModalClose.bind(this,"show")}>
								<Modal.Header closeButton>
									<Modal.Title>Personal Info</Modal.Title>
								</Modal.Header>
								<Modal.Body>
									<HelpBlock style={{"color":"red"}}>Please Fill the Important Fields</HelpBlock>
									<label className = "control-label" htmlFor = "user_name">Name:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_name" id = "user_name" placeholder = "Enter Name"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['name']}/>
									<label className = "control-label" htmlFor = "user_email">Email:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_email" id = "user_email" placeholder = "Enter Email"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['email']}/>
									<label className = "control-label" htmlFor = "user_phone">Phone:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_phone" id = "user_phone" placeholder = "Enter Name"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['phone']}/>
									<label className = "control-label" htmlFor = "user_dob">Date of Birth:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_dob" id = "user_dob" placeholder = "Enter DOB"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['dob']}/>
									<label className = "control-label" htmlFor = "user_location">Phone:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_location" id = "user_location" placeholder = "Enter Location"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['location']}/>
									<label className = "control-label" htmlFor = "user_gender">Phone:<sup style = {{color:'red'}}>* </sup></label>
									<input type = "text" className = "form-control" name = "user_gender" id = "user_gender" placeholder = "Enter Gender"  required = "required" defaultValue={this.state.myObj[0]['personal_info']['gender']}/>
								</Modal.Body>
								<Modal.Footer>
									<button type="submit" className="btn btn-info" onClick={this.handleSavePersonal}>Save</button>
									<button type="button" className="btn btn-default" onClick={this.handleModalClose.bind(this,"show")}>Close</button>
								</Modal.Footer>
							</Modal>
						</form>
						<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}}  id="qualification" name="qualification">
							<div style={{"marginBottom":"10px"}}>
								<h3 className="pull-left" style={{"display":"contents","color":"#375076","fontSize":"20px"}}><span className="glyphicon glyphicon-education" style={{"fontSize":'20px'}}></span>   Qualification</h3>
								<div id="react-no-print" className="pull-right">
									<p className="pull-right" style={{"marginTop":"4px","marginBottom":"0px","cursor":"Pointer"}} onClick={this.addQualification.bind(this)}><a href="" onClick={e => {e.preventDefault();}} style={{"textDecoration":"none","color":"#2c84cc","outline":"none"}}>Add Qualification</a></p>
								</div>
							</div>
							{renderQualificationList()}
							<form className = "form-horizontal" name = "qualification_form" id = "qualification_form" method = "post">
								<Modal show={this.state.showqual} onHide={this.handleModalClose.bind(this,"showqual")}>
									<Modal.Header closeButton>
										<Modal.Title>Education Info</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<HelpBlock style={{"color":"red"}}>Please Fill the Important Fields</HelpBlock>
										<label className = "control-label" htmlFor = "qualification_course">Course Name:<sup style = {{color:'red'}}>* </sup></label>
										<input type = "text" className = "form-control" id="qualification_course" name="qualification_course" placeholder = "Course Name"  required = "required" defaultValue={this.curIndex == null ? '' : this.state.myObj[0]['qualification'][this.curIndex]['education']}/>
										<label className = "control-label" htmlFor = "qualification_institute">Institue Name:<sup style = {{color:'red'}}>* </sup></label>
										<input type = "text" className = "form-control" id="qualification_institute" name="qualification_institute" placeholder = "Institue"  required = "required" defaultValue={this.curIndex == null ? '' : this.state.myObj[0]['qualification'][this.curIndex]['institue_name']} />
										<label className = "control-label" htmlFor = "qualification_yop">Year Of Passing:<sup style = {{color:'red'}}>* </sup></label>
										<select name="qualification_yop" id="qualification_yop" className = "form-control" defaultValue={this.curIndex == null ? '' : this.state.myObj[0]['qualification'][this.curIndex]['year_of_passing']}>
											<option key="0" value="">Select Passing out Year</option>
											{this.state.yop_arr.map((data,index) =>
												<option key={"yop"+index} value={data}>{data}</option>
											)};
										</select>
									</Modal.Body>
									<Modal.Footer>
										<Button type="submit" bsClass="btn btn-info" onClick={this.handleSaveQual.bind(this)}>Save</Button>
										<Button onClick={this.handleModalClose.bind(this,"showqual")}>Close</Button>
									</Modal.Footer>
								</Modal>
							</form>
						</div>							
						<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}}  id="work_experience" name="work_experience">
							<div style={{"marginBottom":"10px"}}>
								<h3 className="pull-left" style={{"display":"contents","color":"#375076","fontSize":"20px"}}><span className="glyphicon glyphicon-briefcase" style={{"fontSize":'20px'}}></span>   Work Experience</h3>
								<div id="react-no-print" className="pull-right">
									<p className="pull-right" style={{"marginTop":"4px","marginBottom":"0px","cursor":"Pointer"}} onClick={this.addExperience.bind(this)}><a href="" onClick={e => {e.preventDefault();}} style={{"textDecoration":"none","color":"#2c84cc","outline":"none"}}>Add Experience</a></p>
								</div>
							</div>
							{renderExperienceList()}
							<form className = "form-horizontal" name = "experience_form" id = "experience_form" method = "post">
								<Modal show={this.state.showexp} onHide={this.handleModalClose.bind(this,"showexp")}>
									<Modal.Header closeButton>
										<Modal.Title>Experience Info</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<label className = "control-label" htmlFor = "exp_organization">Organization:</label>
										<input type = "text" className = "form-control" id="exp_organization" name="exp_organization" placeholder = "Enter Organization"  required = "required" defaultValue={this.curExp == null ? '' : this.state.myObj[0]['experience'][this.curExp]['organization']}/>
										<label className = "control-label" htmlFor = "exp_designation">Designation:</label>
										<input type = "text" className = "form-control" id="exp_designation" name="exp_designation" placeholder = "Enter Designation"  required = "required" defaultValue={this.curExp == null ? '' : this.state.myObj[0]['experience'][this.curExp]['designation']} />
										<label className = "control-label" htmlFor = "exp_from">Experience From (Date of Joining):</label>
										<input type = "text" className = "form-control" id="exp_from" name="exp_from" placeholder = "Joining Date"  required = "required" defaultValue={this.curExp == null ? '' : this.state.myObj[0]['experience'][this.curExp]['exp_from']}/>
										<label className = "control-label" htmlFor = "exp_to">To</label>
										<input type = "text" className = "form-control" id="exp_to" name="exp_to" placeholder = "To Date"  required = "required" defaultValue={this.curExp == null ? '' : this.state.myObj[0]['experience'][this.curExp]['exp_to']}/>
										<label className = "control-label" htmlFor = "exp_department">Department:</label>
										<input type = "text" className = "form-control" id="exp_department" name="exp_department" placeholder = "Department"  required = "required" defaultValue={this.curExp == null ? '' : this.state.myObj[0]['experience'][this.curExp]['exp_department']}/>
									</Modal.Body>
									<Modal.Footer>
										<Button type="submit" bsClass="btn btn-info" onClick={this.handleSaveExp.bind(this)}>Save</Button>
										<Button onClick={this.handleModalClose.bind(this,"showexp")}>Close</Button>
									</Modal.Footer>
								</Modal>
							</form>
						</div>							
						<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}} id="project_detail" name="project_detail">
							<div style={{"marginBottom":"10px"}}>
								<h3 className="pull-left" style={{"display":"contents","color":"#375076","fontSize":"20px"}}><span className="glyphicon glyphicon-send" style={{"fontSize":'20px'}}></span>   Project Details</h3>
								<div id="react-no-print" className="pull-right">
									<p className="pull-right" style={{"marginTop":"4px","marginBottom":"0px","cursor":"Pointer"}} onClick={this.addProject.bind(this)}><a href="" onClick={e => {e.preventDefault();}} style={{"textDecoration":"none","color":"#2c84cc","outline":"none"}}>Add Project</a></p>
								</div>
							</div>
							{renderProjectList()}
							<form className = "form-horizontal" name = "project_form" id = "project_form" method = "post">
								<Modal show={this.state.showproject} onHide={this.handleModalClose.bind(this,"showproject")}>
									<Modal.Header closeButton>
										<Modal.Title>Project Info</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<label className = "control-label" htmlFor = "project_title">Project Title:</label>
										<input type = "text" className = "form-control" id="project_title" name="project_title" placeholder = "Enter Title"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_title']}/>
										<label className = "control-label" htmlFor = "project_description">Description:</label>
										<input type = "text" className = "form-control" id="project_description" name="project_description" placeholder = "Enter Description"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_description']} />
										<label className = "control-label" htmlFor = "project_from">Project Start From:</label>
										<input type = "text" className = "form-control" id="project_from" name="project_from" placeholder = "Enter start date"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_from']}/>
										<label className = "control-label" htmlFor = "project_to">Project End At</label>
										<input type = "text" className = "form-control" id="project_to" name="project_to" placeholder = "Enter end date"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_to']}/>
										<label className = "control-label" htmlFor = "project_role">Role:</label>
										<input type = "text" className = "form-control" id="project_role" name="project_role" placeholder = "Enter Project Role"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_role']}/>
										<label className = "control-label" htmlFor = "project_team">Team Size:</label>
										<input type = "text" className = "form-control" id="project_team" name="project_team" placeholder = "Enter Team Size"  required = "required" defaultValue={this.curProject == null ? '' : this.state.myObj[0]['project'][this.curProject]['project_team']}/>
									</Modal.Body>
									<Modal.Footer>
										<Button type="submit" bsClass="btn btn-info" onClick={this.handleSaveProject.bind(this)}>Save</Button>
										<Button onClick={this.handleModalClose.bind(this,"showproject")}>Close</Button>
									</Modal.Footer>
								</Modal>
							</form>
						</div>							
						<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}} name="technical_skill" id="technical_skill">
							<div style={{"marginBottom":"10px"}}>
								<h3 className="pull-left" style={{"display":"contents","color":"#375076","fontSize":"20px"}}><span className="fas fa-code" style={{"fontSize":'20px'}}></span>   Technical Skills</h3>
								<div id="react-no-print" className="pull-right">
									<p className="pull-right" style={{"marginTop":"4px","marginBottom":"0px","cursor":"Pointer"}} onClick={this.addSkill.bind(this)}><a href="" onClick={e => {e.preventDefault();}} style={{"textDecoration":"none","color":"#2c84cc","outline":"none"}}>Add Skill</a></p>
								</div>
							</div>
							{renderSkillList()}
							<form className = "form-horizontal" name = "skill_form" id = "skill_form">
								<Modal show={this.state.showskill} onHide={this.handleModalClose.bind(this,"showskill")}>
									<Modal.Header closeButton>
										<Modal.Title>Skill Info</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<label className = "control-label" htmlFor = "skill_name">Skill:</label>
										<input type = "text" className = "form-control" id="skill_name" name="skill_name" placeholder = "Skill name"  required = "required" defaultValue={this.curSkill == null ? '' : this.state.myObj[0]['skill'][this.curSkill]['skill_name']}/>
										<label className = "control-label" htmlFor = "exp_year">Experience Year:</label>
										<input type = "text" className = "form-control" id="exp_year" name="exp_year" placeholder = "Experience Year"  required = "required" defaultValue={this.curSkill == null ? '' : this.state.myObj[0]['skill'][this.curSkill]['exp_year']} />
										<label className = "control-label" htmlFor = "exp_month">Experience Month:</label>
										<input type = "text" className = "form-control" id="exp_month" name="exp_month" placeholder = "Experience Month"  required = "required" defaultValue={this.curSkill == null ? '' : this.state.myObj[0]['skill'][this.curSkill]['exp_month']}/>
									</Modal.Body>
									<Modal.Footer>
										<Button type="submit" bsClass="btn btn-info" onClick={this.handleSaveSkill.bind(this)}>Save</Button>
										<Button onClick={this.handleModalClose.bind(this,"showskill")}>Close</Button>
									</Modal.Footer>
								</Modal>
							</form>
						</div>
						<div className="page-header" style={{"marginTop":"20px","paddingBottom": "0px"}} name="achievement" id="achievement">
							<div style={{"marginBottom":"10px"}}>
								<h3 className="pull-left" style={{"display":"contents","color":"#375076","fontSize":"20px"}}><span className="fas fa-trophy" style={{"fontSize":'20px'}}></span>   Achivements and Awards</h3>
								<div id="react-no-print" className="pull-right">
									<p className="pull-right" style={{"marginTop":"4px","marginBottom":"0px","cursor":"Pointer"}} onClick={this.addAchivement.bind(this)}><a href="" onClick={e => {e.preventDefault();}} style={{"textDecoration":"none","color":"#2c84cc","outline":"none"}}>Add Achivement & Awards</a></p>
								</div>
							</div>
							{renderAchivementList()}
							<form className = "form-horizontal" name = "achivement_form" id = "achivement_form">
								<Modal show={this.state.showachivement} onHide={this.handleModalClose.bind(this,"showachivement")}>
									<Modal.Header closeButton>
										<Modal.Title>Achivements and Awards Info</Modal.Title>
									</Modal.Header>
									<Modal.Body>
										<HelpBlock style={{"color":"red"}}>Please Fill the Important Fields</HelpBlock>
										<label className = "control-label" htmlFor = "achivement_name">Achivement:<sup style = {{color:'red'}}>* </sup></label>
										<input type = "text" className = "form-control" id="achivement_name" name="achivement_name" placeholder = "Enter Achivement" required = "required" defaultValue={this.curAchivement == null ? '' : this.state.myObj[0]['achivement'][this.curAchivement]['achivement_name']}/>
									</Modal.Body>
									<Modal.Footer>
										<Button type="submit" bsClass="btn btn-info" onClick={this.handleSaveAchivement.bind(this)}>Save</Button>
										<Button onClick={this.handleModalClose.bind(this,"showachivement")}>Close</Button>
									</Modal.Footer>
								</Modal>
							</form>
						</div>
				</div>
		</div>
    );
  }
}