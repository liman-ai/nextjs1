import { nanoid } from '@/lib/utils';
import { Chat } from '@/components/chat';
import { AI } from '@/lib/chat/actions';
import { auth } from '@/auth';
import { Session } from '@/lib/types';
import { getMissingKeys } from '@/app/actions';
import { toast } from 'sonner'; // Bu kütüphaneyi hata bildirimleri için kullanacağız

export const metadata = {
  title: 'Next.js AI Chatbot'
};

export default async function IndexPage() {
  const id = nanoid();
  const session = (await auth()) as Session;
  const missingKeys = await getMissingKeys();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} onSubmit={handleSubmit} />
    </AI>
  );
}
