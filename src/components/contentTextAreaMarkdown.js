import React, {useRef} from "react";
import "../css/contentTextAreaMarkdown.css"
export default function ContentTextAreaMarkdown({register,name="content",values = {required: "Content is required"} , className="",placeholderText=""}) {

    const textareaRef = useRef(null);

    /*  MARKDOWN
    *
    *   to italic we had _italic text_
    *   to bold we use ** bold text **
    *   for link [text representation](link)
    *   for code ` code here `
    *
    * */
    const addMarkdown = function(markStyle){
        console.log("click on ",markStyle);
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;

        let formattedText = "";
        if (markStyle === "bold") {
            formattedText = `**${text.slice(start, end)}**`;
        } else if (markStyle === "italic") {
            formattedText = `_${text.slice(start, end)}_`;
        } else if (markStyle === "hyperlink") {
            formattedText = `[${text.slice(start, end)}](url)`;
        } else if (markStyle === "code") {
            formattedText = `\`${text.slice(start, end)}\``;
        }


        textarea.value = text.slice(0, start) + formattedText + text.slice(end);
        textarea.setSelectionRange(start, start + formattedText.length);
        textarea.focus();



    }


    return (

        <div className={"contentTextAreaMarkdown"}>
             <textarea
                 ref={textareaRef}
                 className={ className}
                       placeholder={placeholderText}
                       {...register(name, values)}
             > </textarea>
            <ul className={"listOFOptions"}>
                <li onClick={()=>addMarkdown("bold")}>
                    <span className={"toBold md-bold-text"}>B</span>
                </li>
                <li onClick={()=>addMarkdown("italic")}>
                    <span className={"toItalic md-text"}>I</span>
                </li>
                <li onClick={()=>addMarkdown("hyperlink")}>
                    <img src="/icon/link-dark.svg" className={"hyperlink"} alt=""/>
                </li>
                <li onClick={()=>addMarkdown("code")}><img src="/icon/code-dark.svg" className={"toCode"} alt=""/>
                </li>
            </ul>

        </div>

    )
}