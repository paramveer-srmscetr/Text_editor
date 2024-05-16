import React, { useRef, useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Text() {
  const [text, setText] = useState("hi, enter the text");
  const textareaRef = useRef(null);
  const themeRef = useRef("Light");


  const clickText = (e) => {
    setText(e.target.value);
  };
  const clickUpHandler = () => {
    const newText = text.toUpperCase();
    setText(newText);

    if (text.trim().length > 0) {
      toast.success("Text Converted to UPPERCASE ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };
  const clickLoHandler = () => {
    const newText = text.toLowerCase();
    setText(newText);
    if (text.trim().length > 0) {
      toast.success("Text Converted to ToLowerCase ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };
  const clickClearHandler = () => {
    const newText = " ";
    setText(newText);
    if (text.trim().length > 0) {
      toast.success("Text Clear Successfully ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };

  const copyToClipboard = () => {
    // Create a temporary input element
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    // Append the input element to the body
    document.body.appendChild(tempInput);
    // Select text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    // Remove the temporary input element
    document.body.removeChild(tempInput);
    if (text.trim().length > 0) {
      toast.success("Text Copy Successfully ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };

  const cutText = () => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    document.execCommand("cut");
    // Get the text before and after the selected range
    const newText =
      text.substring(0, selectionStart) + text.substring(selectionEnd);

    // Update the text
    setText(newText);
    if (text.trim().length > 0) {
      toast.success("Text Cut Successfully ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };

  const copySelectedText = () => {
    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    // Get the selected text
    const selectedText = text.substring(selectionStart, selectionEnd);

    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(selectedText);
    toast.success("Text Copied Successfully ✅",{autoClose:1500});
  };

  const downloadTextFile = () => {
    const textarea = textareaRef.current;
    if (text.trim().length > 0) {
      // Create a new Blob with the text content
      const blob = new Blob([text], { type: "text/plain" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create a new anchor element
      const anchor = document.createElement("a");

      // Set the href attribute to the URL
      anchor.href = url;

      // Set the download attribute and file name
      anchor.download = "text.txt";

      // Programmatically click the anchor element to trigger download
      anchor.click();

      // Revoke the URL to release the object URL
      URL.revokeObjectURL(url);

      toast.success("File Downloaded Successfully ✅", { autoClose: 1500 });
    } else {
      toast.error("Please Write Something❌");
    }
  };
  //     const tooglerTheme = () => {
  //         const theme = themeRef.current;
  //         // Toggle the theme between 'light' and 'dark'
  //         themeRef.current = theme === 'light' ? 'dark' : 'light';

  //         // Update the background color based on the theme

  //         document.body.style.backgroundColor = themeRef.current === 'light' ? 'hsla(0, 0%, 0%, 0.884)' : 'rgb(238, 255, 245)';
  //         document.body.style.color = themeRef.current === 'light' ? 'white' : 'Black';

  // }
  const tooglerTheme = () => {
 
    const theme = themeRef.current;
    // Toggle the theme between 'light' and 'dark'
    themeRef.current = theme === "light" ? "dark" : "light";
if(themeRef.current==='light'){
    toast.success('Dark Mode Applied Successfully', { autoClose: 1500 })
}else{
    toast.success('Light Mode Applied Successfully',{autoClose:1500})
    
}
    // Update the background color and text color based on the theme
    document.body.style.backgroundColor =
      themeRef.current === "light"
        ? "hsla(0, 0%, 0%, 0.884)"
        : "rgb(238, 255, 245)";
    document.body.style.color =
      themeRef.current === "light" ? "white" : "black";

    // Update the text-box color
    const textBox = document.querySelector("textarea");
    textBox.style.backgroundColor =
      themeRef.current === "light"
        ? "hsla(0, 0%, 0%, 0.884)"
        : "rgb(238, 255, 245)";
    textBox.style.color =
      themeRef.current === "light" ? "rgb(238, 255, 245)" : "Black";

   

  };


  return (
    <>
      <div className="box">
        <h1>Type-Text Here </h1>
        <label className="switch">
          <input type="checkbox" onClick={tooglerTheme} />

          <span className="slider round"></span>
        </label>
      </div>
      <div className="box-text">
        <textarea
          name="text"
          id="text"
          value={text}
          onChange={clickText}
          ref={textareaRef}
        ></textarea>
     
      </div>
      <div className="btn-box">
        <button className="btn" onClick={clickUpHandler}>
          ToUpperCase
        </button>
        <button className="btn" onClick={clickLoHandler}>
          ToLowerCase
        </button>
        <button className="btn" onClick={copyToClipboard}>
          CopyAll
        </button>{" "}
        {/* Added button for copy */}
        <button className="btn" onClick={copySelectedText}>
          CopySelectedText
        </button>
        <button className="btn" onClick={cutText}>
          Cut
        </button>
        <button className="btn" onClick={clickClearHandler}>
          ToClearText
        </button>
        <button className="btn" onClick={downloadTextFile}>
          DownloadTextFile
        </button>
        <ToastContainer />
      </div>
      <div className="text-summary">
        <h2>Text Summary</h2>
        <p>
          {text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length} words
          and {text.length} characters
        </p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}

export default Text;
