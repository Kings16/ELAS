
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean
from orm_interface.base import Base
from sqlalchemy.orm import relationship



class E3_Courses(Base):
    __tablename__ = "e3_courses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    selected = Column(Boolean)
    title = Column(String)
    link = Column(String)
    catalog = Column(String)
    type = Column(String)
    sws= Column(String)
    num_expected_participants = Column(String)
    max_participants = Column(String)
    credit = Column(String)
    language = Column(String)
    description = Column(String)
    location = Column(String)
    exam_type = Column(String)
    time_manual = Column(String)
    ausgeschlossen_ingenieurwissenschaften_bachelor = Column(String)
    fairness = Column(String)
    support = Column(String)
    material = Column(String)
    fun = Column(String)
    comprehensibility = Column(String)
    interesting = Column(String)
    grade_effort = Column(String)
 
    def __init__(self, selected, title, link, catalog, type, 
                    sws, num_expected_participants, 
                    max_participants, credit,language,
                    description, location, exam_type, time_manual,
                    ausgeschlossen_ingenieurwissenschaften_bachelor,
                    fairness, support, material, fun, comprehensibility, interesting, grade_effort):
        self.selected = selected
        self.title = title
        self.link = link
        self.catalog = catalog
        self.type = type
        self.sws = sws
        self.num_expected_participants = num_expected_participants
        self.max_participants = max_participants
        self.credit = credit
        self.language = language
        self.description = description
        self.location = location
        self.exam_type = exam_type
        self.time_manual = time_manual
        self.ausgeschlossen_ingenieurwissenschaften_bachelor = ausgeschlossen_ingenieurwissenschaften_bachelor
        self.fairness = fairness
        self.support = support
        self.material = material
        self.fun = fun
        self.comprehensibility = comprehensibility
        self.interesting = interesting
        self.grade_effort = grade_effort