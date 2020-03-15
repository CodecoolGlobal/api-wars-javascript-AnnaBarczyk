import bcrypt

def hash_password(plain_text_password):
    # By using bcrypt, the salt is saved into the hash itself
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

# # anku = hash_password('anku')
# # hashed = '$2b$12$soZC5/KMp7T5HEFOZpbyLuBwpmB1N1m6J.QWNJtFSrgqo.UDGm6L2'
# # sprawdz = verify_password(anku, hashed)
#
# print(anku)
# # hash = hash_password('dupa')
# # print(hash)