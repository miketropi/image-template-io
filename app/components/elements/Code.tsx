import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import { Braces } from "lucide-react";
// Register languages for syntax highlighting
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);

interface CodeProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export const explain = {
  name: "Code",
  icon: <Braces />,
  description: "A code block with syntax highlighting",
}

const Code = ({ code, language, showLineNumbers = true }: CodeProps) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      showLineNumbers={showLineNumbers}
      // showInlineLineNumbers={false}
      // wrapLines={true}
      wrapLongLines={true}
      lineProps={{ style: { flexWrap: 'wrap' } }}
      customStyle={{
        margin: 0,
        borderRadius: '4px',
        fontSize: '14px',
        wordBreak: 'break-all',
        whiteSpace: 'pre-wrap'
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;

