import React from "react";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const KeyWordCloud = (props) => {
  const {keywords} = props
   

  const openModal = (word) => {
    console.log(`Word clicked: ${word}`);
  };

  return (
    <>
      <ReactWordcloud
        words={keywords}
        options={{
          colors: [
            "#b39ddb",
            "#7e57c2",
            "#4fc3f7",
            "#03a9f4",
            "#0288d1",
            "#01579b"
          ],
          enableTooltip: true,
          deterministic: true,
          fontFamily: "helvetica",
          fontSizes: [14, 90],
          fontStyle: "normal",
          fontWeight: "normal",
          padding: 3,
          rotations: 1,
          rotationAngles: [0, 90],
          scale: "sqrt",
          spiral: "archimedean",
          transitionDuration: 1000
        }}
        callbacks={{
          onWordClick: (word) => openModal(word.text),
          getWordTooltip: (word) =>
            `The word "${word.text}" appears ${word.value} times.`
        }}
      />
    </>
  );
};

export default  KeyWordCloud;
