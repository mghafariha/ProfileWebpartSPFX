import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'ProfileCardWebPartStrings';
import ProfileCard from './components/ProfileCard';
import { IProfileCardProps } from './entities/IProfileCardProps';
import pnp from "sp-pnp-js";
export interface IProfileCardWebPartProps {
  description: string;
  backgroundUrl:string;
  leftLinkTitle:string;
  leftLinkUrl:string;
  rightLinkTitle:string;
  rightLinkUrl:string;
  leftLinkIcon:string;
  rightLinkIcon:string;
  cssUrl:string;
}

export default class ProfileCardWebPart extends BaseClientSideWebPart<IProfileCardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProfileCardProps > = React.createElement(
      ProfileCard,
      {
        description: this.properties.description,
        context:this.context.pageContext.web.title,
         web:this.context.pageContext.site.absoluteUrl,
         backgroundUrl:this.properties.backgroundUrl?this.context.pageContext.site.absoluteUrl+this.properties.backgroundUrl: "",
        leftLinkTitle:this.properties.leftLinkTitle,
         leftLinkUrl:this.properties.leftLinkUrl,
         rightLinkTitle:this.properties.rightLinkTitle,
         rightLinkUrl:this.properties.rightLinkUrl,
         
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    console.log('site',this.context.pageContext.site.absoluteUrl +this.properties.cssUrl);
    SPComponentLoader.loadCss(this.context.pageContext.site.absoluteUrl +this.properties.cssUrl);
 

    return super.onInit().then(_ => {
        pnp.setup({
          spfxContext: this.context
        })
      
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                
                PropertyPaneTextField('backgroundUrl', {
                  label: "Profile Card Background",
                  placeholder:'Example : /siteassets/common.jpg'
                }),
                PropertyPaneTextField('leftLinkTitle', {
                  label: "Left link Title",
                  placeholder:'Example : test'
                }),
                PropertyPaneTextField('leftLinkUrl', {
                  label: "Left link Url",
                  placeholder:'Example : /_layouts/15/viewlsts.aspx'
                }),
                PropertyPaneTextField('leftLinkIcon', {
                  label: "Left link Icon",
                  placeholder:'Example : /siteassets/common.jpg'
                }),
                PropertyPaneTextField('rightLinkTitle', {
                  label: "Right Link Title",
                  placeholder:'Example : test'
                }),
                PropertyPaneTextField('rightLinkUrl', {
                  label: "Right Link Url",
                  placeholder:'Example : /_layouts/15/viewlsts.aspx'
                }),
                PropertyPaneTextField('rightLinkIcon', {
                  label: "Right link Icon",
                  placeholder:'Example : /siteassets/common.jpg'
                }),
                PropertyPaneTextField('cssUrl', {
                  label: "Profile Card Css",
                  placeholder:'Example : /siteassets/style.css'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
