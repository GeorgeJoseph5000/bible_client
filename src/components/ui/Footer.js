import React, { useContext } from 'react'
import { LangContext, ThemeContext } from '../../App'
import { Button } from 'react-bootstrap'
import DarkModeToggle from "react-dark-mode-toggle"
import ScrollToTop from "react-scroll-to-top";

export default function Footer() {

    const { lang, changeLang } = useContext(LangContext)
    const { theme, changeTheme } = useContext(ThemeContext)

    const toggleLang = () => {
        if(lang == "en"){
            changeLang("ar")
        }else{
            changeLang("en")  
        }
    }

    const toggleTheme = () => {
        if(theme == "dark"){
            changeTheme("light")
        }else{
            changeTheme("dark")  
        }
    }

    return (
        <footer className="bg-dark text-center text-white" dir="ltr">
            <ScrollToTop smooth />
            <div className="container p-4">

                <section className="mb-6">
                <Button onClick={toggleLang}>{lang == "en" ? "عربي" : "English"}</Button>
                &nbsp;&nbsp;&nbsp;
                <DarkModeToggle
                    onChange={toggleTheme}
                    checked={theme == "dark"}
                    speed={2}
                    />
                
                </section>
            </div>

            <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2023 Copyright:
                <a className="text-white" href="https://portfolio.georgejoseph.rf.gd">portfolio.georgejoseph.rf.gd</a>
            </div>


            
                    
        </footer>
    )
}
