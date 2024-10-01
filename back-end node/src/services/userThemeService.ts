import ThemeModel from '../model/themeModel';
import { Request, Response } from 'express';
import { Session } from "express-session";

interface CustomSession extends Session{
  themecart?:{
    items:any[];
  };
}
const getallThemes = () => {
  return ThemeModel.findAll();
};

const selectThemes=(session:CustomSession,data:any)=>{
  if(session.themecart){
    session.themecart.items.push(data);
  }else{
    session.themecart={
      items:[data]
    };
  }
};
const userThemeServices = {
  getallThemes,
  selectThemes
};

export default userThemeServices;
