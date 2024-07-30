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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: /* mesajlarınızı ekleyin */ })
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get('X-RateLimit-Reset');
        toast.error(`You have reached your request limit. Try again after ${retryAfter} seconds.`);
      } else {
        // Diğer işlemler
      }
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
