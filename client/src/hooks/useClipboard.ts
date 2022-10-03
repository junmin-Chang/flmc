import { useCallback, useState } from 'react';
type onCopyFn = (text: string) => Promise<boolean>;

const useClipboard = (): [boolean, onCopyFn] => {
  const [copied, setCopied] = useState(false);
  const onCopy: onCopyFn = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        return true;
      } catch (err) {
        setCopied(false);
        return false;
      }
    },
    [copied, setCopied],
  );

  return [copied, onCopy];
};

export default useClipboard;
