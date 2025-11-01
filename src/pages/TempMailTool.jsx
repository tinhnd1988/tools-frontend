import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useTranslation } from 'react-i18next';
import { Mail, MailOpen, Trash2, RefreshCw, Copy, CheckCircle, Clock, FileText, ExternalLink } from 'lucide-react';

export default function TempMailTool() {
  const { http } = useApi();
  const { t } = useTranslation();
  const [mailbox, setMailbox] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Auto refresh messages every 30 seconds
    if (mailbox?.token) {
      const interval = setInterval(() => {
        loadMessages();
      }, 30000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailbox?.token]);

  async function createMailbox() {
    setLoading(true);
    try {
      const { data } = await http.post('/temp-mail');
      if (data.success) {
        setMailbox(data.data);
        localStorage.setItem('temp_mail_token', data.data.token);
        await loadMessages();
      }
    } catch (error) {
      console.error('Error creating mailbox:', error);
      alert(t('tempmail_error_create'));
    } finally {
      setLoading(false);
    }
  }

  async function loadMailbox() {
    const token = localStorage.getItem('temp_mail_token');
    if (!token) return;

    try {
      const { data } = await http.get(`/temp-mail/mailbox/${token}`);
      if (data.success) {
        setMailbox(data.data);
        await loadMessages();
      } else {
        localStorage.removeItem('temp_mail_token');
      }
    } catch {
      localStorage.removeItem('temp_mail_token');
    }
  }

  async function loadMessages() {
    if (!mailbox?.token) return;

    try {
      const { data } = await http.get(`/temp-mail/mailbox/${mailbox.token}/messages`);
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }

  async function loadMessage(messageId) {
    if (!mailbox?.token) return;

    try {
      const { data } = await http.get(`/temp-mail/mailbox/${mailbox.token}/messages/${messageId}`);
      if (data.success) {
        setSelectedMessage(data.data);
      }
    } catch (error) {
      console.error('Error loading message:', error);
    }
  }

  async function deleteMailbox() {
    if (!mailbox?.token || !confirm(t('tempmail_confirm_delete'))) return;

    try {
      await http.delete(`/temp-mail/mailbox/${mailbox.token}`);
      setMailbox(null);
      setMessages([]);
      setSelectedMessage(null);
      localStorage.removeItem('temp_mail_token');
    } catch (error) {
      console.error('Error deleting mailbox:', error);
    }
  }

  async function deleteMessage(messageId) {
    if (!mailbox?.token) return;

    try {
      await http.delete(`/temp-mail/mailbox/${mailbox.token}/messages/${messageId}`);
      await loadMessages();
      if (selectedMessage?.id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  }

  function copyEmail() {
    if (!mailbox?.email) return;
    navigator.clipboard.writeText(mailbox.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useEffect(() => {
    loadMailbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mailbox) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white border rounded-lg p-6 text-center space-y-4">
          <Mail className="w-16 h-16 mx-auto text-indigo-600" />
          <h2 className="text-2xl font-bold">{t('tempmail_title')}</h2>
          <p className="text-zinc-600">{t('tempmail_desc')}</p>
          <button
            onClick={createMailbox}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                {t('tempmail_creating')}
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                {t('tempmail_create')}
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mailbox Header */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-sm text-zinc-500 mb-1">{t('tempmail_your_email')}</div>
            <div className="flex items-center gap-2">
              <code className="text-lg font-mono font-semibold text-indigo-600 break-all">{mailbox.email}</code>
              <button
                onClick={copyEmail}
                className="p-2 hover:bg-zinc-100 rounded transition-colors"
                title={t('tempmail_copy')}
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-zinc-600" />
                )}
              </button>
            </div>
            {mailbox.expires_at && (
              <div className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {t('tempmail_expires')}: {new Date(mailbox.expires_at).toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadMessages}
              className="px-4 py-2 border rounded-lg hover:bg-zinc-50 flex items-center gap-2"
              title={t('tempmail_refresh')}
            >
              <RefreshCw className="w-4 h-4" />
              {t('tempmail_refresh')}
            </button>
            <button
              onClick={deleteMailbox}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {t('tempmail_delete')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Messages List */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b font-semibold flex items-center justify-between">
            <span>{t('tempmail_inbox')}</span>
            {mailbox.unread_count > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                {mailbox.unread_count}
              </span>
            )}
          </div>
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-zinc-500">
                <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>{t('tempmail_no_messages')}</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => loadMessage(msg.id)}
                  className={`p-4 cursor-pointer hover:bg-zinc-50 transition-colors ${
                    selectedMessage?.id === msg.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                  } ${!msg.is_read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {msg.is_read ? (
                        <MailOpen className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <Mail className="w-5 h-5 text-indigo-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{msg.from.name || msg.from.email}</div>
                      <div className="text-xs text-zinc-500 truncate">{msg.from.email}</div>
                      <div className="font-semibold mt-1 truncate">{msg.subject}</div>
                      <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{msg.preview}</div>
                      <div className="text-xs text-zinc-400 mt-2">
                        {new Date(msg.received_at).toLocaleString()}
                      </div>
                    </div>
                    {msg.has_attachments && (
                      <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message View */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b font-semibold">{t('tempmail_message')}</div>
          <div className="p-4">
            {!selectedMessage ? (
              <div className="text-center text-zinc-500 py-12">
                <MailOpen className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p>{t('tempmail_select_message')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-zinc-500 mb-1">{t('tempmail_from')}</div>
                    <div className="font-medium">
                      {selectedMessage.from.name ? (
                        <>
                          {selectedMessage.from.name} &lt;{selectedMessage.from.email}&gt;
                        </>
                      ) : (
                        selectedMessage.from.email
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"
                    title={t('tempmail_delete_message')}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <div className="text-sm text-zinc-500 mb-1">{t('tempmail_subject')}</div>
                  <div className="font-semibold">{selectedMessage.subject}</div>
                </div>

                <div>
                  <div className="text-sm text-zinc-500 mb-1">{t('tempmail_date')}</div>
                  <div className="text-sm">
                    {new Date(selectedMessage.received_at).toLocaleString()}
                  </div>
                </div>

                {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                  <div>
                    <div className="text-sm text-zinc-500 mb-2">{t('tempmail_attachments')}</div>
                    <div className="space-y-1">
                      {selectedMessage.attachments.map((att, idx) => (
                        <a
                          key={idx}
                          href={att.url || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          {att.filename || `Attachment ${idx + 1}`}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="text-sm text-zinc-500 mb-2">{t('tempmail_body')}</div>
                  {selectedMessage.html_body ? (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedMessage.html_body }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-sm text-zinc-700 font-mono">
                      {selectedMessage.text_body || t('tempmail_no_body')}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

