import prisma from './prisma';


export type LogLevel = 'info' | 'warn' | 'error' | 'critical';

export async function createAuditLog({
  level = 'info',
  action,
  message,
  metadata,
  userId,
}: {
  level?: LogLevel;
  action: string;
  message: string;
  metadata?: any;
  userId?: string;
}) {
  try {
    return await (prisma as any).auditLog.create({
      data: {
        level,
        action,
        message,
        metadata: metadata || {},
        userId,
      },
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}
