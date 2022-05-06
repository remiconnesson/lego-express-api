http :3000/signup name=Zorro password=secret1234 email=zorro@gmail.com
http :3000/signup name=Kelsier password=motdepasse email=kelsier@gmail.com
http :3000/signup name=Luffy password=53CR37 email=luffy@gmail.com
http :3000/signup name=Shallan password=secret1234 email=shallan@gmail.com
# generate tokens
http :3000/signin password=53CR37 email=luffy@gmail.com
http :3000/signin password=secret1234 email=zorro@gmail.com

