import * as React from 'react';

import {initializeIcons} from 'office-ui-fabric-react'; 
import { getIconClassName } from '@uifabric/styling';
import { Web } from "sp-pnp-js";
import CurrentUser  from "sp-pnp-js";
import {Fabric} from 'office-ui-fabric-react/lib/Fabric';
import styles from './ProfileCard.module.scss';
import { IProfileCardProps } from '../entities/IProfileCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp from "sp-pnp-js"; 
import { IProfileCardState } from '../entities/IProfileCardState';


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
 console.log(profile);
 this.setState({...this.state,currentUser:{name:profile.DisplayName,pictureUrl:profile.PictureUrl}})
 console.log(profile.pictureUrl);

    
      }
  public render(): React.ReactElement<IProfileCardProps> {
    return (
      <div className={styles.smileyFace} >
        <div className={ styles.container }>
          <div className={styles.row}  >
            <div className={styles.topCard}  style={{ 
      backgroundImage:this.props.backgroundUrl!=''?`url("${ this.props.backgroundUrl}")`: "../images/background.jpg",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
          <img src={this.state.currentUser.pictureUrl} alt="my image"  />
          </div>
          <div>
         
            <div className={styles.buttomCardTitle}>{this.state.currentUser.name}</div>
            <div    className={styles.buttomCardLinks}>
            
              <a className={styles.buttomCardLink} href={this.props.leftLinkUrl} target='_blank'  data-interception="off"> <img src={require('../images/leftIcon.svg')}  alt="my image" width="40" /><span className={styles.buttomLinkSpan} >{this.props.leftLinkTitle}</span></a> 
              <a className={styles.buttomCardLink} href={this.props.rightLinkUrl} target='_blank'  data-interception="off"> <img src={require('../images/rightIcon.svg')}  alt="my image" width="40" /><span className={styles.buttomLinkSpan} >{this.props.rightLinkTitle}</span></a>
            </div>
          </div>

          </div>
         
        </div>
      </div>
    
    );
  }
}
