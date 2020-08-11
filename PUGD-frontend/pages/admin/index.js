import React from "react";
import AdminLayout from "@/components/adminLayout";
import {Bar} from 'react-chartjs-2';

const admin = () => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    return <React.Fragment>
                    <div className="container">
                        <div className="section">

                            {/*<!-- card stats start -->*/}

                            <div id="card-stats" className="pt-0">
                                <div className="row">
                                    <div className="col s12 m6 l3">
                                        <div className="card animate fadeLeft">
                                            <div className="card-content cyan white-text">
                                                <p className="card-stats-title"><i className="material-icons">person_outline</i>Circulation</p>
                                                <h4 className="card-stats-number white-text"></h4>
                                                <p className="card-stats-compare">
                                                    <i className="material-icons">keyboard_arrow_up</i> 15%
                                                    <span className="cyan text text-lighten-5">from yesterday</span>
                                                </p>
                                            </div>
                                            <div className="card-action cyan darken-1">
                                                <div id="clients-bar" className="center-align"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s12 m6 l3">
                                        <div className="card animate fadeLeft">
                                            <div className="card-content red accent-2 white-text">
                                                <p className="card-stats-title"><i className="material-icons">attach_money</i>catalogage</p>
                                                <h4 className="card-stats-number white-text">$8990.63</h4>
                                                <p className="card-stats-compare">
                                                    <i className="material-icons">keyboard_arrow_up</i> 70% <span className="red-text text-lighten-5">last
                        month</span>
                                                </p>
                                            </div>
                                            <div className="card-action red">
                                                <div id="sales-compositebar" className="center-align"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s12 m6 l3">
                                        <div className="card animate fadeRight">
                                            <div className="card-content orange lighten-1 white-text">
                                                <p className="card-stats-title"><i className="material-icons">trending_up</i> Authorité</p>
                                                <h4 className="card-stats-number white-text">$806.52</h4>
                                                <p className="card-stats-compare">
                                                    <i className="material-icons">keyboard_arrow_up</i> 80%
                                                    <span className="orange-text text-lighten-5">from yesterday</span>
                                                </p>
                                            </div>
                                            <div className="card-action orange">
                                                <div id="profit-tristate" className="center-align"/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col s12 m6 l3">
                                        <div className="card animate fadeRight">
                                            <div className="card-content green lighten-1 white-text">
                                                <p className="card-stats-title"><i className="material-icons">content_copy</i> Acqusition</p>
                                                <h4 className="card-stats-number white-text">1806</h4>
                                                <p className="card-stats-compare">
                                                    <i className="material-icons">keyboard_arrow_down</i> 3%
                                                    <span className="green-text text-lighten-5">from last month</span>
                                                </p>
                                            </div>
                                            <div className="card-action green">
                                                <div id="invoice-line" className="center-align"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                         </div>
                            
                            {/*<!--card stats end-->
                            <!--chart dashboard start-->*/}

                            <div id="chart-dashboard">
                                <div>
                                    <h2>Graph Example </h2>
                                    <Bar
                                        data={data}
                                        width={50}
                                        height={50}
                                        options={{
                                            maintainAspectRatio: false
                                        }}
                                    />
                                </div>

                            </div>
                            {/*<!--chart dashboard end-->
                            <!--work collections start-->*/}
                            <div id="work-collections">
                                <div className="row">
                                    <div className="col s12 m12 l6">
                                        <ul id="projects-collection" className="collection z-depth-1 animate fadeLeft">
                                            <li className="collection-item avatar">
                                                <i className="material-icons cyan circle">card_travel</i>
                                                <h6 className="collection-header m-0">Projects</h6>
                                                <p>Your Favorites</p>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s6">
                                                        <p className="collections-title">Web App</p>
                                                        <p className="collections-content">AEC Company</p>
                                                    </div>
                                                    <div className="col s3"><span className="task-cat cyan">Development</span></div>
                                                    <div className="col s3">
                                                        <div id="project-line-1"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s6">
                                                        <p className="collections-title">Mobile App for Social</p>
                                                        <p className="collections-content">iSocial App</p>
                                                    </div>
                                                    <div className="col s3"><span className="task-cat red accent-2">UI/UX</span></div>
                                                    <div className="col s3">
                                                        <div id="project-line-2"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s6">
                                                        <p className="collections-title">Website</p>
                                                        <p className="collections-content">MediTab</p>
                                                    </div>
                                                    <div className="col s3"><span className="task-cat teal accent-4">Marketing</span></div>
                                                    <div className="col s3">
                                                        <div id="project-line-3"/>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s6">
                                                        <p className="collections-title">AdWord campaign</p>
                                                        <p className="collections-content">True Line</p>
                                                    </div>
                                                    <div className="col s3"><span className="task-cat deep-orange accent-2">SEO</span></div>
                                                    <div className="col s3">
                                                        <div id="project-line-4"/>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <ul id="issues-collection" className="collection z-depth-1 animate fadeRight">
                                            <li className="collection-item avatar">
                                                <i className="material-icons red accent-2 circle">bug_report</i>
                                                <h6 className="collection-header m-0">Issues</h6>
                                                <p>Assigned to you</p>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s7">
                                                        <p className="collections-title"><strong>#102</strong> Home Page</p>
                                                        <p className="collections-content">Web Project</p>
                                                    </div>
                                                    <div className="col s2"><span className="task-cat deep-orange accent-2">P1</span></div>
                                                    <div className="col s3">
                                                        <div className="progress">
                                                            <div className="determinate" style={{width: `70%` }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s7">
                                                        <p className="collections-title"><strong>#108</strong> API Fix</p>
                                                        <p className="collections-content">API Project</p>
                                                    </div>
                                                    <div className="col s2"><span className="task-cat cyan">P2</span></div>
                                                    <div className="col s3">
                                                        <div className="progress">
                                                            <div className="determinate" style={{width: `40%` }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s7">
                                                        <p className="collections-title"><strong>#205</strong> Profile page css</p>
                                                        <p className="collections-content">New Project</p>
                                                    </div>
                                                    <div className="col s2"><span className="task-cat red accent-2">P3</span></div>
                                                    <div className="col s3">
                                                        <div className="progress">
                                                            <div className="determinate" style={{width: `95` }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="collection-item">
                                                <div className="row">
                                                    <div className="col s7">
                                                        <p className="collections-title"><strong>#188</strong> SAP Changes</p>
                                                        <p className="collections-content">SAP Project</p>
                                                    </div>
                                                    <div className="col s2"><span className="task-cat teal accent-4">P1</span></div>
                                                    <div className="col s3">
                                                        <div className="progress">
                                                            <div className="determinate" style={{width: `10%` }}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="content-overlay"/>
    </React.Fragment>
};
admin.Layout = AdminLayout;
export default admin;