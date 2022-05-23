from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from orm_interface.base import Base
from sqlalchemy.orm import relationship


class E3_Rating(Base):
 __tablename__ = "e3_rating"
 id = Column(Integer, primary_key=True, autoincrement=True)
 fairness = Column(String)
 support = Column(String)
 material = Column(String)
 fun = Column(String)
 comprehensibility = Column(String)
 interesting = Column(String)
 grade_effort = Column(String)

 def __init__(self, fairness, support, 
    material, fun, comprehensibility, 
    interesting, grade_effort):

    self.fairness = fairness
    self.support = support
    self.material = material
    self.fun = fun
    self.comprehensibility = comprehensibility
    self.interesting = interesting
    self.grade_effort = grade_effort
