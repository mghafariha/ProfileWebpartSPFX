import * as React from 'react';

import {initializeIcons} from 'office-ui-fabric-react'; 
import { getIconClassName } from '@uifabric/styling';
import { Web } from "sp-pnp-js";
import CurrentUser  from "sp-pnp-js";
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from '@microsoft/sp-http';
import { IProfileCardProps } from '../entities/IProfileCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js"; 
import { IProfileCardState } from '../entities/IProfileCardState';

const leftIconUrl: any = require('../images/leftIcon.svg');
const rightIconUrl: any = require('../images/rightIcon.svg');
const backgroundUrl: any = require('../images/background.jpg');
export default class ProfileCard extends React.Component<IProfileCardProps, IProfileCardState> {

  constructor(props) {

    super(props);
    this.state = {  
      currentUser:{name:'',pictureUrl:''} ,
       hasUserData:false,
       isLoading:true
    }; 
    
  }
  public async componentDidMount(){

    const profile = await pnp.sp.profiles.userProfile;
    const loginName= profile.AccountName.replace('i:0#.f|membership|','');
    console.log('test',this.props);

    const pictureUrl= `${this.props.web}/_layouts/15/userphoto.aspx?size=S&accountname=${loginName}`
 console.log(profile);
 this.setState({...this.state,currentUser:{name:profile.DisplayName,pictureUrl:  pictureUrl}})
 console.log(profile.pictureUrl);

    
      }
  public render(): React.ReactElement<IProfileCardProps> {
    return (
      <div className="profileCard">
        <div className="container">
          <div className="row" >
            <div className="topCard" style={{ 
      backgroundImage:this.props.backgroundUrl!=''?`url("${ this.props.backgroundUrl}")`: `url("${backgroundUrl}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
          <img src={this.state.currentUser.pictureUrl} alt="my image"  />
          </div>
          <div>
         
            <div className="buttomCardTitle">{this.state.currentUser.name}</div>
            <div    className="buttomCardLinks">
            
              <a className="buttomCardLink" href={this.props.leftLinkUrl} target='_blank'  data-interception="off"> <img src={ this.props.leftLinkIcon!=''?this.props.leftLinkIcon:leftIconUrl}  alt="my image" width="40" /><span className="buttomLinkSpan" >{this.props.leftLinkTitle}</span></a> 
              <a className="buttomCardLink" href={this.props.rightLinkUrl} target='_blank'  data-interception="off"> <img src={this.props.rightLinkIcon!=''?this.props.rightLinkIcon :rightIconUrl}  alt="my image" width="40" /><span className="buttomLinkSpan" >{this.props.rightLinkTitle}</span></a>
            </div>
          </div>

          </div>
         
        </div>
      </div>
    
    );
  }
}
