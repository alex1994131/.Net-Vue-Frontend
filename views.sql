CREATE TABLE [CommentAttachment] (
    [commentId] int NOT NULL,
    [attachmentId] int NOT NULL,
    CONSTRAINT [PK_CommentAttachment] PRIMARY KEY ([commentId], [attachmentId]),
    CONSTRAINT [FK_CommentAttachment_Attachments_attachmentId] FOREIGN KEY ([attachmentId]) REFERENCES [Attachments] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_CommentAttachment_comments_commentId] FOREIGN KEY ([commentId]) REFERENCES [comments] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_CommentAttachment_attachmentId] ON [CommentAttachment] ([attachmentId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20201215053935_mig2', N'3.1.7');

GO

