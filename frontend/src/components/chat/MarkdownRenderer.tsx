import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface Props {
  content: string;
}

const MarkdownRenderer = ({ content }: Props) => {
  const [copied, setCopied] = useState("");

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);

    setCopied(code);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="prose prose-invert max-w-none prose-pre:p-0 prose-code:text-blue-300">
      <ReactMarkdown
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              const codeString = String(children).replace(/\n$/, "");

              return (
                <div className="relative my-4">

                  {/* Copy Button */}

                  <button
                    onClick={() => copyCode(codeString)}
                    className="
                      absolute
                      top-3
                      right-3
                      z-10
                      flex
                      items-center
                      gap-2
                      bg-slate-800
                      hover:bg-slate-700
                      text-white
                      text-xs
                      px-3
                      py-1.5
                      rounded-lg
                      transition
                    "
                  >
                    {copied === codeString ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>

                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                    PreTag="div"
                    customStyle={{
                      borderRadius: "14px",
                      padding: "20px",
                      margin: 0,
                      fontSize: "14px",
                    }}
                  >
                    {codeString}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className="bg-slate-800 px-1.5 py-1 rounded text-blue-300">
                {children}
              </code>
            );
          },

          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-4">{children}</h1>
          ),

          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-3">{children}</h2>
          ),

          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-2">{children}</h3>
          ),

          p: ({ children }) => (
            <p className="leading-7 mb-3">{children}</p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc ml-6 space-y-2">{children}</ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal ml-6 space-y-2">{children}</ol>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-300">
              {children}
            </blockquote>
          ),

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;